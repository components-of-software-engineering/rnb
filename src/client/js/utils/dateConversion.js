export function toFormatedString(dateString, showTime = false) {
    const date = new Date(dateString);
    const y = date.getFullYear();
    const m = `${(date.getMonth() + 1) > 9 ? '' : '0'}` + (date.getMonth() + 1);
    const d = `${date.getDate() > 9 ? '' : '0'}` + date.getDate();
    const H = `${date.getHours() > 9 ? '' : '0'}` + date.getHours();
    const M = `${date.getMinutes() > 9 ? '' : '0'}` + date.getMinutes();
    const S = `${date.getSeconds() > 9 ? '' : '0'}` + date.getSeconds();
    return `${d}.${m}.${y}` + (showTime ? ` ${H}:${M}:${S}` : "");
}

export function toValueHtmlString(dateString) {
    const date = new Date(dateString);
    const y = date.getFullYear();
    const m = `${(date.getMonth() + 1) > 9 ? '' : '0'}` + (date.getMonth() + 1);
    const d = `${date.getDate() > 9 ? '' : '0'}` + date.getDate();
    return `${y}-${m}-${d}`;
}
