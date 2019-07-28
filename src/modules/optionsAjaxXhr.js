
export let ajaxOptions = {
    async:              true,
    cache:              false,
    contentType:        'application/x-www-form-urlencoded; charset=UTF-8',
    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
    },
    method:             'POST',
    timeout:            0,
    url:                location.href
}
