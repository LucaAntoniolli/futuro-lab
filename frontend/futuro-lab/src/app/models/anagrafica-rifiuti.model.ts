import moment from 'moment';
import { Moment } from 'moment';

export class AnagraficaRifiuti {
    id: number = 0;
    tipo: string = "" ;
    descrizione?: string | null;
    luogoProduzione?: string | null;
    dataProduzione?: Moment | null;
    note?: string | null;

    static map(data: any): AnagraficaRifiuti {
    let r = Object.assign(new AnagraficaRifiuti(), data);
    if (data.dataProduzione) {
        r.dataProduzione = moment(data.dataProduzione);
    }
    return r;
    }

    static mapArray(arr: any[]): AnagraficaRifiuti[] {
    return (arr || []).map(c => AnagraficaRifiuti.map(c));
    }
}
