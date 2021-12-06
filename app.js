const input = document.querySelector('input')


input.addEventListener('focus', ()=>{
    const form = document.querySelector('form')
    const section = document.querySelector('section')
    form.classList.add('focus')
})


input.addEventListener('blur', ()=>{
    const form = document.querySelector('form')
    form.classList.remove('focus')
})





// Fetch Data Use Asynchonous Programing =======================================================


class PhotoGalery{
        constructor(){
            this.API_KEY = '563492ad6f91700001000001a21c5ec7394b463e827e1428087568e0'
            this.GalleryDiv = document.querySelector('.gellry') 
            this.SearchForm = document.querySelector('.header form')
            this.loadMOre = document.querySelector('.loadMOre')
            this.goHomeBtn = document.querySelector('.go_home')
            this.alert = document.querySelector('.alert')
            this.close = document.querySelector('.close')
            this.pageindex = 1;
            this.inputvalueGlobaly= ''
            this.eventHandle()
        }


        eventHandle(){
            document.addEventListener('DOMContentLoaded', ()=>{
                this.getImage(this.index)
                this.alertFunc()
            })
            this.SearchForm.addEventListener('submit' ,(e)=>{
                this.inputvalueGlobaly = 1;
                this.getSearchImages(e)
                
            })

            this.loadMOre.addEventListener('click', (e)=>{
                this.getORImage(e)
            })
            this.goHomeBtn.addEventListener('click', ()=>{
                this.inputvalueGlobaly = 1
                this.GalleryDiv.innerHTML = ''
                this.getImage(1)
            })
            this.close.addEventListener('click', ()=>{
                this.closeFunc()
            })
            

        }

        alertFunc(e){
            this.alert.classList.add('active')
        }


        closeFunc(){
            this.alert.classList.remove('active')
            
        }

         async getImage(index){
            this.loadMOre.setAttribute('data-img', 'curated')
             let BaseUrl = `https://api.pexels.com/v1/curated?page=${index}&per_page=12`
             let data = await this.fatchingImage(BaseUrl)
             console.log(data.photos)
             await this.GeneralHTML(data.photos)
        }

        async fatchingImage (BaseUrl){
            let response = await fetch(BaseUrl,{
                method : 'GET',
                headers: {
                    Accept : 'Application/json',
                    Authorization : this.API_KEY
                }
            });
            let data = response.json()
            
            return data
        }


         GeneralHTML(data){
             data.forEach(photo => {
                const item = document.createElement('div')
                item.classList.add('itmes')
                item.innerHTML = `
                <a href="#">
                <img src="${photo.src.medium}" alt="">
                </a>
                <h2> ${photo.photographer} </h2>
                `
                this.GalleryDiv.appendChild(item)
            });
        }
        async getSearchImages(e){
            this.loadMOre.setAttribute('data-img', 'search')
            e.preventDefault()
            this.GalleryDiv.innerHTML = ''
            let inputValue = e.target.querySelector('input').value
            this.inputvalueGlobaly = inputValue
            let SearchBaseUrl = `https://api.pexels.com/v1/search?query=${this.inputvalueGlobaly}&page_1&per_page=12`
            let data = await this.fatchingImage(SearchBaseUrl)
            await this.GeneralHTML(data.photos)
            e.target.querySelector('input').value = ''
        }
        async getSearchLoadMore(index){
            // let inputValue = this.SearchForm.querySelector('input').value
            let SearchBaseUrl = `https://api.pexels.com/v1/search?query=${this.inputvalueGlobaly}&page=${index}&per_page=12`
            let data = await this.fatchingImage(SearchBaseUrl)
            await this.GeneralHTML(data.photos)
        }


        getORImage(e){
        this.index = this.pageindex ++
            let loadMOreData = e.target.getAttribute('data-img')
        if(loadMOreData === 'curated'){
            this.getImage(this.index)
        }else{
            this.getSearchLoadMore(this.index)
        }
    }
}


let myPhotoHouse = new PhotoGalery()
