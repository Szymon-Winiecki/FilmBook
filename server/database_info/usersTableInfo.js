const tableName = 'uzytkownik';
const idField = 'id';
const usernameField = 'nazwa';
const emailField = 'email';
const telephoneField = 'nr_telefonu';
const birthdateField = 'data_urodzenia';
const passwordHashField = 'password';
const refreshTokenField = 'refreshToken';
const insertFormat = `${usernameField}, ${passwordHashField}`;

module.exports = {
    tableName,
    idField,
    usernameField,
    emailField,
    telephoneField,
    birthdateField,
    passwordHashField,
    refreshTokenField,
    dataFormat: insertFormat,
}