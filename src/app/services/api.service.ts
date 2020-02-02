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

  public searchUser(params) {
    return this.httpClient.get(`${environment.apiUrl}/v1.0/search/users`, { params });
  }

  public getUser(userId) {
    return this.httpClient.get(`${environment.apiUrl}/v1.0/users/${userId}`);
  }

  public updateUser(userId, changes) {
    return this.httpClient.post(`${environment.apiUrl}/v1.0/users/${userId}`, changes);
  }

  public getUserVoice(userId, page = 0) {
    return this.httpClient.get(`${environment.apiUrl}/v1.0/users/${userId}/voice`,
    {
      params: {
        page,
        orderBy: 'createdAt',
        direction: 'DESC',
      } as any,
    });
  }

  public getUserVoiceAverage(userId) {
    return this.httpClient.get(`${environment.apiUrl}/v1.0/users/${userId}/voice/average`);
  }

  public getUserVoiceDaily(userId) {
    return this.httpClient.get(`${environment.apiUrl}/v1.0/users/${userId}/voice/daily`);
  }

  public getUserMessages(userId) {
    return this.httpClient.get(`${environment.apiUrl}/v1.0/users/${userId}/messages`);
  }

  public getUserMessagesDaily(userId, days = 7) {
    return this.httpClient.get(`${environment.apiUrl}/v1.0/users/${userId}/messages/daily`, { params: { days } as any });
  }

  public getRoles() {
    return this.httpClient.get(`${environment.apiUrl}/v1.0/roles`);
  }

  public getAllRoles() {
    return this.httpClient.get(`${environment.apiUrl}/v1.0/roles`, { params: { limit: '2000' }});
  }

  public getApplicationSession(uuid) {
    return this.httpClient.get(`${environment.apiUrl}/v1.0/discord/session`, { params: { uuid }});
  }

  public getApplications(status = 'voting', page = 0, orderBy = 'createdAt', direction = 'DESC') {
    return this.httpClient.get(`${environment.apiUrl}/v1.0/applications`, { params: { status, page, orderBy, direction } as any});
  }

  public getUserApplications(userId, page = 0) {
    return this.httpClient.get(`${environment.apiUrl}/v1.0/applications/${userId}`, { params: { page } as any });
  }

  public submitApplication(data) {
    return this.httpClient.post(`${environment.apiUrl}/v1.0/application/submit`, data);
  }

  public getApplication(appId) {
    return this.httpClient.get(`${environment.apiUrl}/v1.0/application/${appId}`);
  }

  public voteApplication(appId, upvote: boolean) {
    return this.httpClient.post(`${environment.apiUrl}/v1.0/applications/${appId}/vote`, { upvote });
  }

  public updateApplication(appId, status, uid) {
    return this.httpClient.post(`${environment.apiUrl}/v1.0/applications/${appId}`, { status, uid });
  }

  public getSteamData(steamId) {
    return this.httpClient.get(`${environment.apiUrl}/v1.0/steam/getUsers`, { params: { steamIds: steamId }});
  }

  public getSteamBanData(steamId) {
    return this.httpClient.get(`${environment.apiUrl}/v1.0/steam/getUserBans`, { params: { steamIds: steamId }});
  }

  public pingTagChannel(uid) {
    return this.httpClient.get(`${environment.apiUrl}/v1.0/applications/giveTags`, { params: { uid }});
  }

  public completeApplication(appId, body) {
    return this.httpClient.post(`${environment.apiUrl}/v1.0/applications/${appId}/complete`, { ...body });
  }

  public promoteApplicant(userId) {
    return this.httpClient.get(`${environment.apiUrl}/v1.0/application/promote`, { params: { userId }});
  }

  public getVoiceActivityByDivision(search, days = 7) {
    return this.httpClient.get(`${environment.apiUrl}/v1.0/voice/${search}`, { params: { days } as any});
  }

  public getUserEventLog(userId) {
    return this.httpClient.get(`${environment.apiUrl}/v1.0/eventlog/${userId}`);
  }
}
