import moment from 'moment';
import { Moment } from 'moment';

export class Personale {
  id: number = 0;
  nome: string = "";
  cognome: string = "";
  societa?: string | null;
  dataInizio?: Moment | null;
  dataFine?: Moment | null;

    static map(data: any): Personale {
        let r = Object.assign(new Personale(), data);
        if (data.dataInizio) {
            r.dataInizio = moment(data.dataInizio);
        }
        if (data.dataFine) {
            r.dataFine = moment(data.dataFine);
        }
        return r;
    }

    static mapArray(arr: any[]): Personale[] {
    return (arr || []).map(c => Personale.map(c));
    }
}
