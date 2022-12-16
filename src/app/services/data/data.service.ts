import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private siblingMsg = new Subject<any>();
  constructor() { }
  /*
   * @return {Observable<string>} :  siblingMsg
   */
  public getMessage(): Observable<any> {
    return this.siblingMsg.asObservable();
  }
  /*
   * @param {string} message : siblingMsg
   */
  public updateMessage(message: any): void {
    this.siblingMsg.next(message);
  }
}
