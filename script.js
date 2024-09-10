// const img_card = document.querySelector('#img-card')
// const titulo_card = document.querySelector('#card-title')
// const card_descricao = document.querySelector('#card-description')
const container = document.querySelector('#container')

async function buscarDados() {
    try {
        const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?language=pt&archetype=Blue-Eyes`
        const response = await fetch(url)
        if (!response.ok){
            throw new Error('A conexão não foi bem sucedida!' + response.statusText)
        }

        const dados = await response.json()
        
        if (dados.data && dados.data.length > 0){

            container.innerHTML = ''
            
            dados.data.forEach(card => {
                const cardElement = document.createElement('div')
                cardElement.className = 'card col-md-3'

                const img = document.createElement('img')
                img.src = card.card_images[0].image_url
                img.className = 'card-img-top'
                img.alt = card.name

                const cardBody = document.createElement('div')
                cardBody.className = 'card-body'

                const title = document.createElement('h4')
                title.className = 'card-title'
                title.textContent = card.name

                const description = document.createElement('p')
                description.className = 'card-text'
                description.textContent = card.desc

                cardBody.appendChild(title)
                cardBody.appendChild(description)
                cardElement.appendChild(img)
                cardElement.appendChild(cardBody)

                container.appendChild(cardElement)

            });

            
        }else{
            console.log('No foi encontrado os dados.')
        }
    }catch(error){
        console.error('Problemas com a conexão:', error)
    }
}

buscarDados()