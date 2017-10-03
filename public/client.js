const inputDom = document.querySelector('input')
const imgDom = document.querySelector('img')
const urlSeed = window.location.pathname.slice(1)

inputDom.value = urlSeed
inputDom.focus()

const input = Rx.Observable.fromEvent(
  inputDom,
  'input',
)

const img = document.querySelector('img')

const requestStream = seed => Rx.Observable.of(`/img-only-${seed}`)

const responseStream = seed => requestStream(seed)
  .mergeMap(requestUrl =>
    Rx.Observable.fromPromise(window.fetch(requestUrl))
  )

input.map(event => event.target.value)
  .debounce(() => Rx.Observable.interval(400))
  .subscribe(value => {
    responseStream(value).subscribe(response => {
      img.src = img.src.replace(/(\d+)$/g, new Date().getTime())
    })
  })
