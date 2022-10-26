import {datubasea} from './datubasea.js'


let indizea = 0
const URLBASE = 'https://covers.openlibrary.org/b/id/'
let izenburua  = document.getElementById('izenburua');
let irudia = document.getElementById('irudia')
let egilea = document.getElementById('egilea')
let isbn = document.getElementById('isbn')
let aurrera = document.getElementById('aurrera')
let atzera = document.getElementById('atzera')
let bilatu = document.getElementById('bilatu')
let kop= document.getElementById('libKop')
function eremuakBete(){

    izenburua.value = datubasea[indizea].izenburua
    data.value = datubasea[indizea].data
    egilea.value = datubasea[indizea].egilea
    isbn.value = datubasea[indizea].isbn
    irudia.src = URLBASE + datubasea[indizea].filename 
    kop.innerText=datubasea.length

}

function convert(is){
    console.log(is)
    let gakoa=Object.keys(is)
    return {
     "isbn": isbn.value,
    "egilea": is[gakoa].details.authors['0'].name,
    "data": is[gakoa].details.publish_date,
    "izenburua": is[gakoa].details.title,
    "filename": is[gakoa].thumbnail_url.replace('-S','-M').replace(URLBASE,'')
    }
    
}


 function kargatu(){

    eremuakBete()

    aurrera.addEventListener('click', (event) => {
        if (indizea < datubasea.length-1)
            indizea++
        eremuakBete()
    })
    atzera.addEventListener('click', (event) => {
        if (indizea > 0)
            indizea--
        eremuakBete()
    })
    bilatu.onclick= async (event) => {
        let i= (datubasea.findIndex(is => is.isbn==isbn.value))
        if(i!=-1){
            indizea=i;
            eremuakBete()        
        }else{
            let objektua=await fetch("http://openlibrary.org/api/books?bibkeys=ISBN:"+isbn.value+"&format=json&jscmd=details").then(r=> r.json())
            datubasea.push(convert(objektua));
            console.log(datubasea)
            indizea=datubasea.length-1;
            eremuakBete()
        }
    }


}

window.onload = kargatu;

