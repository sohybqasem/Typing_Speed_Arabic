import { useEffect } from 'react'
import { loadedData } from '../lib/state'
import { Action, State } from '../lib/types'

function dataNameToFileName(dataName: string) {
  if (dataName === 'C#') return 'csharp'
  return dataName.toLowerCase().replace(/ /g, '-')
}

export function useData(dataName: State['dataName'], dispatch: React.Dispatch<Action>) {
  useEffect(() => {
    let isCancelled = false

    if (dataName in loadedData) {
      dispatch({
        type: 'setData',
        dataName: dataName,
        data: loadedData[dataName] as string[]
      })
    } else {
      dispatch({ type: 'setFetchingData', data: true })

      // var fileName;
      // if (dataName === "العربية"){
      //   console.log("arabic activated")
      //  fileName = dataNameToFileName("arabic_10k")
      // }else{
      //  fileName = dataNameToFileName(dataName)
      // }
      const fileName = dataNameToFileName(dataName)
      console.log('filename', fileName)
      //de public\json\arabic_10k.json
      fetch(`/json/${fileName}.json`)
        .then(res => res.json())
        .then(data => {
          if (isCancelled) {
            // save the data but don't set it
            loadedData[dataName] = data
          } else {
            dispatch({ type: 'setFetchingData', data: false })
            dispatch({ type: 'setData', data, dataName })
          }
        })
    }

    return () => {
      isCancelled = true
    }
  }, [dispatch, dataName])
}
