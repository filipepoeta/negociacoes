import { NegociacoesService } from './../services/negociacoes-service.js';
import { Negociacoes } from '../models/negociacoes.js';
import { Negociacao } from '../models/negociacao.js';
import { NegociacoesView } from '../views/negociacaoes-view.js';
import { MensagemView } from '../views/mensagem-view.js';
import { DiasDaSemana } from '../enums/dias-da-semana.js';
import { logarTempoDeExecucao } from '../decorators/logar-tempo-de-execucao.js';
import { domInjector } from '../decorators/dom-injector.js';

export class NegociacaoController{
    @domInjector('#data')
    private inputData: HTMLInputElement;
    @domInjector('#quantidade')
    private inputQuantidade:HTMLInputElement;
    @domInjector('#valor')
    private inputValor:HTMLInputElement;
    private _negociacoes = new Negociacoes();
    private mensagemView = new MensagemView('#mensagemView');
    private negociacoesView = new NegociacoesView('#negociacoesview');
    private negociacoesService = new NegociacoesService();
    

    constructor(){
        this.negociacoesView.update(this._negociacoes);
    }

    importaDados():void{
        this.negociacoesService
        .obeterNegociacoesDoDia()
        .then(negociacoesDeHoje =>{
            for(let negociacao of negociacoesDeHoje){
                this._negociacoes.adiciona(negociacao);
            }
            this.negociacoesView.update(this._negociacoes);
        });
    }


    @logarTempoDeExecucao()
    public Adiciona():void{
        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        );
        if (!this.diaUtil(negociacao.data)){
            this.mensagemView.update('Apenas negociações em dias úteis são permitidas!');
            return;
        }
        this._negociacoes.adiciona(negociacao);
        this.atualizaView();
        this.limparFormulario();          
    }

    private diaUtil(data: Date){
        return data.getDay() > DiasDaSemana.DOMINGO 
        && data.getDay() < DiasDaSemana.SABADO;
    }

    private limparFormulario():void{
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    private atualizaView(): void{
        this.negociacoesView.update(this._negociacoes);
        this.mensagemView.update("Negociação adicionada com sucesso!")
    }
}

