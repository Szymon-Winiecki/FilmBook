create or replace procedure nadaj_uprawnienie(
   nazwa_rangi ranga.nazwa%type,
   nazwa_uprawnienia uprawnienie.nazwa%type
)
language plpgsql    
as $$
declare
	_ranga_id ranga.id%type;
	_uprawnienie uprawnienie.nazwa%type;
begin
   	select into _ranga_id id from ranga where nazwa = nazwa_rangi;
	
	if _ranga_id IS NULL then
		insert into ranga(nazwa) values(nazwa_rangi);
		select into _ranga_id id from ranga where nazwa = nazwa_rangi;
		
		RAISE NOTICE 'utowrzono range %', nazwa_rangi;
	end if;
	
   	select into _uprawnienie nazwa from uprawnienie where nazwa = nazwa_uprawnienia;
	
	if _uprawnienie IS NULL then
		insert into uprawnienie(nazwa) values(nazwa_uprawnienia);
		_uprawnienie = nazwa_uprawnienia;
		
		RAISE NOTICE 'utowrzono uprawnienie %', nazwa_uprawnienia;
	end if;
	
	
	insert into uprawnienia_rang(ranga_id, uprawnienie_nazwa) values(_ranga_id, _uprawnienie);
end;$$;

create or replace procedure nadaj_range(
   nazwa_uzytkownika uzytkownik.nazwa%type,
   nazwa_rangi ranga.nazwa%type
)
language plpgsql  
as $$
declare
	_uzytkownik_id uzytkownik.id%type;
	_ranga_id ranga.id%type;
begin
   	select into _uzytkownik_id id from uzytkownik where nazwa = nazwa_uzytkownika;
	
	if _uzytkownik_id IS NULL then
		RAISE NOTICE 'Nie ma takiego uzytkownika';
		return;
	end if;
	
   	select into _ranga_id id from ranga where nazwa = nazwa_rangi;
	
	if _ranga_id IS NULL then
		RAISE NOTICE 'Nie ma takiej rangi';
		return;
	end if;
	
	insert into rangi_uzytkownikow(uzytkownik_id, ranga_id) values(_uzytkownik_id, _ranga_id);
end;$$;

create or replace function authorize(
   user_id uzytkownik.id%type,
   permission_name uprawnienie.nazwa%type
)
returns boolean
language plpgsql    
as $$
declare
	_c integer;
begin
   	select into _c count(*) from uzytkownik u 
					join rangi_uzytkownikow ru on u.id = ru.uzytkownik_id 
					join ranga r on ru.ranga_id = r.id 
					join uprawnienia_rang ur on r.id = ur.ranga_id
			where u.id = user_id and ur.uprawnienie_nazwa = permission_name;
			
	if _c > 0 then
		return true;
	else 
		return false;
	end if;
end;$$;


--nadanie uprawnień rangom

do
$$
declare
	_permission uprawnienie.nazwa%type;
begin
	for _permission in select nazwa from uprawnienie where nazwa like 'show_%' loop
		call nadaj_uprawnienie('User', _permission);
		call nadaj_uprawnienie('Editor', _permission);
	end loop;
	
	for _permission in select nazwa from uprawnienie where nazwa like 'add_%' or nazwa like 'alter_%' or nazwa like 'delete_%' loop
		call nadaj_uprawnienie('Editor', _permission);
	end loop;
	
	for _permission in select nazwa from uprawnienie loop
		call nadaj_uprawnienie('Admin', _permission);
	end loop;
end
$$;