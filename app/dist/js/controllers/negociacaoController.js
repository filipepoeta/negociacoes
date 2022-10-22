var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NegociacoesService } from './../services/negociacoes-service.js';
import { Negociacoes } from '../models/negociacoes.js';
import { Negociacao } from '../models/negociacao.js';
import { NegociacoesView } from '../views/negociacaoes-view.js';
import { MensagemView } from '../views/mensagem-view.js';
import { DiasDaSemana } from '../enums/dias-da-semana.js';
import { logarTempoDeExecucao } from '../decorators/logar-tempo-de-execucao.js';
import { domInjector } from '../decorators/dom-injector.js';
export class NegociacaoController {
    constructor() {
        this._negociacoes = new Negociacoes();
        this.mensagemView = new MensagemView('#mensagemView');
        this.negociacoesView = new NegociacoesView('#negociacoesview');
        this.negociacoesService = new NegociacoesService();
        this.negociacoesView.update(this._negociacoes);
    }
    importaDados() {
        this.negociacoesService
            .obeterNegociacoesDoDia()
            .then(negociacoesDeHoje => {
            for (let negociacao of negociacoesDeHoje) {
                this._negociacoes.adiciona(negociacao);
            }
            this.negociacoesView.update(this._negociacoes);
        });
    }
    Adiciona() {
        const negociacao = Negociacao.criaDe(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);
        if (!this.diaUtil(negociacao.data)) {
            this.mensagemView.update('Apenas negociações em dias úteis são permitidas!');
            return;
        }
        this._negociacoes.adiciona(negociacao);
        this.atualizaView();
        this.limparFormulario();
    }
    diaUtil(data) {
        return data.getDay() > DiasDaSemana.DOMINGO
            && data.getDay() < DiasDaSemana.SABADO;
    }
    limparFormulario() {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }
    atualizaView() {
        this.negociacoesView.update(this._negociacoes);
        this.mensagemView.update("Negociação adicionada com sucesso!");
    }
}
__decorate([
    domInjector('#data')
], NegociacaoController.prototype, "inputData", void 0);
__decorate([
    domInjector('#quantidade')
], NegociacaoController.prototype, "inputQuantidade", void 0);
__decorate([
    domInjector('#valor')
], NegociacaoController.prototype, "inputValor", void 0);
__decorate([
    logarTempoDeExecucao()
], NegociacaoController.prototype, "Adiciona", null);
