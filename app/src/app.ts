import { NegociacaoController } from './controllers/negociacaoController.js';

const controller = new NegociacaoController();
const form = document.querySelector('.form') as HTMLElement;

form.addEventListener('submit', event =>{
    event.preventDefault();
    controller.Adiciona();
    
});

const botaoImporta = document.querySelector('#botao-importa');
if(botaoImporta){
    botaoImporta.addEventListener('click', () =>{
        controller.importaDados();
    });
}
else
{
    throw Error('Botão importa não foi encontrado'); 
}
