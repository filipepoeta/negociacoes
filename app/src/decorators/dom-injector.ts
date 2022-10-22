export function domInjector(seletor: string){
    return function(target: any, propertyKey: string){

        let elemento: HTMLElement;
      
        const getter = function(){
            if(!elemento){
                elemento = <HTMLElement>document.querySelector(seletor);
            }
                 
            return elemento;
        }
        /*aplicar o getter criado à propriedade definida pela variável 
        propertyKey através de Object.defineProperty.*/
        Object.defineProperty
        (target,
        propertyKey,
        {get:getter}
        );
    }
}