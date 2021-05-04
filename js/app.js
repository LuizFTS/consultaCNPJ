let cnpj = '';

class Receita{
    
    get(url){
        return new Promise((resolve, reject) => {
            fetch(url)
            .then(res => res.json())
            .then(data => resolve(data))
            .then(err => reject(err));
        });

    }
}


const requisicao = new Receita;

document.getElementById('formulario').addEventListener('submit', function(e){
    cnpj = document.getElementById('cnpj');
    e.preventDefault();
    if(cnpj.value === ''){
        alert('Digite um CNPJ');
    } else if(cnpj.value.length < 13){
        alert('Verifique a quantidade de números');
    } else if(isNaN(parseInt(cnpj.value))){
        alert('Apenas números são válidos');
    } else {
        cnpj = cnpj.value.replace(/\./g,'');
        cnpj = cnpj.replace(/\-/g,'');
        cnpj = cnpj.replace(/\//g, '');


        requisicao.get(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`)
        .then(data =>{ if(data.message === "CNPJ inválido"){
            document.getElementById('dados').innerHTML = `<p class="list-group-item list-group-item-danger">${data.message}</p>`;
            console.log(data.message);
        } else {
                document.getElementById('dados').innerHTML = `
                <li class="list-group-item list-group-item-success">Nome da empresa: ${data.nome}</li>
                <li class="list-group-item list-group-item-success">CNPJ: ${data.cnpj}</li>
                <li class="list-group-item list-group-item-success">UF: ${data.uf}</li>
                <li class="list-group-item list-group-item-success">Município: ${data.municipio}</li>
                <li class="list-group-item list-group-item-success">Situação cadastral: ${data.situacao}</li>
                <li class="list-group-item list-group-item-success">Telefone: ${data.telefone}</li>
                `
            }
        })
        .catch(err => console.log(err));
    }
})


const inputText = document.getElementById('cnpj').addEventListener('keyup', (e) =>{
    if(e.target.value !== ''){
        document.getElementById('cnpj').style.border = "2px solid rgb(6, 83, 6)";
    } else {
        document.getElementById('cnpj').style.border = '2px solid rgb(255, 81, 0)';
    }
})
