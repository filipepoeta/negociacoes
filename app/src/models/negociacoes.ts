import { Negociacao } from './negociacao.js';

export class Negociacoes{
    //Não posso colocar o ReadOlyArray aqui pq senão o método push não funciona no metodo adicionar.
    //private _negociacoes: Array<Negociacao> = []; forma mais verbosa.
    private _negociacoes: Negociacao[] = []; // forma mais curta e ideal

    public adiciona(negociacao:Negociacao){
        this._negociacoes.push(negociacao);
    }

    //O ReadOnlyArray aqui, serve para deixar a lista imutável. 
    // ReadonlyArray<Negociacao> -> forma mais verbosa
     public lista(): readonly Negociacao[]{ //forma mais curta e moderna.
        return this._negociacoes;

    }
}