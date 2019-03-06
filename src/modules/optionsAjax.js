
export let ajaxOptions = {
    cache:              'no-store',
    credentials:        'same-origin',
    headers: {
                        'Content-Type': 'application/json'
    },
    method:             'POST',
    mode:               'same-origin',
    redirect:           'follow',
    timeout:            0,
    url:                location.href
}
