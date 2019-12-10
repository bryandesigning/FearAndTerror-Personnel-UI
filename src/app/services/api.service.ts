import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {}

  public getUserCount() {
    return this.httpClient.get(`${environment.apiUrl}/v1.0/users/count`);
  }

  public getNewUsersByDay(days = 7) {
    return this.httpClient.get(`${environment.apiUrl}/v1.0/users/new`, { params: { days: `${days}` } });
  }

  public getNewMessagesByDay(days = 7, channelId = '') {
    return this.httpClient.get(`${environment.apiUrl}/v1.0/messages/new`, { params: { days: `${days}`, channelId } });
  }

  public getTotalVoiceEvents() {
    return this.httpClient.get(`${environment.apiUrl}/v1.0/voice/count`);
  }

  public getAllChannels() {
    return this.httpClient.get(`${environment.apiUrl}/v1.0/channels`, { params: { limit: '2000' }});
  }

  public getAverageVoiceTime() {
    return this.httpClient.get(`${environment.apiUrl}/v1.0/voice/average`);
  }

  public getTotalMessageCount() {
    return this.httpClient.get(`${environment.apiUrl}/v1.0/messages/count`);
  }

  public getTotalSquadEvents() {
    return this.httpClient.get(`${environment.apiUrl}/v1.0/squad/count`);
  }
}