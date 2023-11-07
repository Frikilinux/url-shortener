const inputUrl = document.getElementById('url')
const result = document.getElementById('result')
const form = document.getElementById('form')
const { protocol } = window.location

const getShortUrl = async (longUrl) => {
  try {
    const response = await fetch(`${protocol}/shorten`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      method: 'post',
      body: JSON.stringify({ url: longUrl }),
    })
    const data = await response.json()

    return data
  } catch (error) {
    return error.message
  }
}

const handleSubmit = async (event) => {
  event.preventDefault()
  if (!inputUrl.value) {
    result.innerText = 'Url is required'
    return
  }
  const shortUrl = await getShortUrl(inputUrl.value)
  result.innerText = `${shortUrl.url}`
}

const init = () => {
  form.onsubmit = handleSubmit
}

init()
