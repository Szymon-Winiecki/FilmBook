create or replace procedure nadaj_uprawnienie(
   p_ranga_id ranga.id%type,
   p_nazwa_uprawnienia uprawnienie.nazwa%type
)
language plpgsql    
as $$
declare
	_uprawnienie uprawnienie.nazwa%type;
	_liczUprawnienie integer;
begin	
   	select into _uprawnienie nazwa from uprawnienie where nazwa = p_nazwa_uprawnienia;
		
	if _uprawnienie is not null then
		select into _liczUprawnienie count(*)
		from uprawnienia_rang
		where ranga_id = p_ranga_id and uprawnienie_nazwa = _uprawnienie;

		if _liczUprawnienie = 0 then
			insert into uprawnienia_rang(ranga_id, uprawnienie_nazwa) values(p_ranga_id, _uprawnienie);
		end if;
	end if;
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
	_user_rank ranga.id%type;
begin
	select into _user_rank ranga_id  from uzytkownik
	where id = user_id;

   	select into _c count(*)
	from uprawnienia_rang
	where ranga_id=_user_rank and uprawnienie_nazwa = permission_name;
			
	if _c > 0 then
		return true;
	else 
		return false;
	end if;
end;$$;

--nadanie uprawnień randze Admin
do
$$
declare
	_permission uprawnienie.nazwa%type;
begin
	for _permission in select nazwa from uprawnienie loop
		call nadaj_uprawnienie(1, _permission);
	end loop;
end
$$;

create or replace function update_avg_rate()
returns trigger
language plpgsql    
as $$
declare
	_avg numeric;
	_film_id ocena.film_id%type;
begin	
	if new.film_id is null then
		_film_id = old.film_id;
	else
		_film_id = new.film_id;
	end if;
   select into _avg avg(ocena) from ocena where film_id = _film_id;
	update film set srednia_ocen = _avg  where id = _film_id;
	return new;
end;$$;

CREATE OR REPLACE TRIGGER update_avg_rate_i AFTER insert ON ocena FOR EACH ROW EXECUTE PROCEDURE update_avg_rate();
CREATE OR REPLACE TRIGGER update_avg_rate_u AFTER update ON ocena FOR EACH ROW EXECUTE PROCEDURE update_avg_rate();
CREATE OR REPLACE TRIGGER update_avg_rate_d AFTER delete ON ocena FOR EACH ROW EXECUTE PROCEDURE update_avg_rate();