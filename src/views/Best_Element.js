class Best_Element{
    //główna funkcja
    onLoad(data, weights){
        console.log(weights)

        this.elementData = data;

        //nazwy wszystkich kluczy tablic które potem są użyte aby kod działał automatycznie
        const keys = Object.keys(this.elementData[0]);
        const {low, high, new_weights} = this.calculateWeight(keys, weights);

        // ten skrawek kodu generuje bloki poszczególnych kluczy które sprawdzają który element jest najlepszy pod względem tego klucza
        keys.slice(2, -1).forEach(key =>{
            this.elementData.sort((a, b) => a[key] - b[key])

            // ustawienie najmniejszych oraz największych wartości danego klucza
            low[key] = this.elementData[0][key];
            high[key] = this.elementData[this.elementData.length - 1][key];


        });

        const winning_data = this.result(high, keys, new_weights);


        return({winning_data})
    }


    // funkcja przyjmująca wagi kluczy oraz automatycznie tworząca puste tablice z uzupełnionymi kluczami
    calculateWeight(keys, weights){
        let low = {};
        let high = {};
        let weightSum = 0;
        let new_weights = weights;

        // tworzenie tablic oraz przyjmowanie wag od użytkownika
        keys.slice(2, -1).forEach(key =>{
            low[key] = 0;
            high[key] = 0;
        });

        for (let key in new_weights) {
            weightSum += new_weights[key];
        }

        // dzięki poniższemu skrawkowi kodu, wagi również są zapisywane w formie rozmytej
        for (let key in new_weights) {
            new_weights[key] = new_weights[key] / weightSum;
        }

        return {low, high, new_weights};
    }


    // funkcja podsumowująca dane
    result(high,  keys, weight){
        // let confirms = {}
        // skrypt pytający czy dany klucz powinienen być podliczany jako coś pozytywnegy, czy negatwnego
        // np.: cena czegoś jest negatywna ponieważ chcąc wybrać najlepszy element szukamy najniższej ceny a nie na odwrót
        // keys.slice(2, -1).forEach(key => {
        //     const userConfirmed = window.confirm("Should {" + key + "} be counted as a negative thing")
        //     if(userConfirmed){
        //         confirms[key] = "-";
        //     }else{
        //         confirms[key] = "+";
        //     }
        // })
        let winning_data = [];

        this.elementData.forEach(element => {
            let sum = 0;
            let element_data = {};

            //poniższy kod sprawdza czy klucze były wcześniej wybrane jako pozytywne, czy negatywne, po czym konwertuje te dane na liczby rozmyte
            keys.slice(2, -1).forEach(key => {
                // if(confirms[key] === "-"){
                //     element_data[key] = 1 - element[key]/high[key];
                // }else{
                    element_data[key] = element[key]/high[key];

                // }
            })
            // podliczanie sumy wszystkich licz
            keys.slice(2, -1).forEach(key =>{
                if(weight[key] !== 0){
                    if(weight[key]===1){
                        weight[key]=0.999;
                    }
                    
                    sum += element_data[key] - element_data[key] * weight[key];
                }else{
                    element_data[key] = 0;
                }
            })

            winning_data.push({"name": element.name, "sum": sum,
             "cena":element_data["cena"] - element_data["cena"] * weight["cena"],
              "przebieg": element_data["przebieg"] - element_data["przebieg"] * weight["przebieg"],
               "klimatyzacja":element_data["klimatyzacja"] - element_data["klimatyzacja"] * weight["klimatyzacja"],
                "sredni_koszt_naprawy":element_data["sredni_koszt_naprawy"] - element_data["sredni_koszt_naprawy"] * weight["sredni_koszt_naprawy"],
                 "producer": element.producer});
            
            
            // ustalenie kto jest wygranyms
        });
        let max_sum = 0;
        winning_data.map(element=>{
            if(element["sum"] > max_sum){

                max_sum = element["sum"];
            }
        });

        winning_data.map(element=>{
            element["sum"] = element["sum"]/max_sum;
        });
        winning_data.sort((a,b)=> b["sum"] - a["sum"])

        return winning_data;
    }
}
export default Best_Element;