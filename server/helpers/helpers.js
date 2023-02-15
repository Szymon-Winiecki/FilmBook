// escape ' by doubling them up (' -> '')
function esc(string) {
    return string.replaceAll("'", "''")
}

module.exports = {
    esc,
}