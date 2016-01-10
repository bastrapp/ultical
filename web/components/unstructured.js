function isEmpty(obj) {
	if (obj instanceof Array) {
		return obj.length == 0;
	} else {
		for(var prop in obj) {
			return false;
		}
	}
	return true;
}

function isEmptyString(str) {
	return undefined === str || null === str || str.length == 0 || str == '';
}

function stringStartsWith (string, prefix) {
    return string.slice(0, prefix.length) == prefix;
}

if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
}