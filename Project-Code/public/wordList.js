export function getWordList(documents) {
    var parteien = documents.keys()

    var WordList = new Map();

    for(var i = 0; i <= documents.size-1; i++){
        var arr = []
        var actualParty = parteien.next().value
        documents.get(actualParty).forEach(d => arr.includes(d) ? "" : arr.push(d))
        WordList.set(actualParty,arr)
    }
    
    return WordList
}