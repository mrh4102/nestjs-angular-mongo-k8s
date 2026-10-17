import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { firstValueFrom } from 'rxjs';

type AppConfig = {
  apiUrl: string;
};

@Service()
export class ConfigService {
  private readonly http = inject(HttpClient);

  private config: AppConfig | null = null;

  loadConfig(): Promise<void> {
    return firstValueFrom(this.http.get<AppConfig>('/config.json')).then((appConfig) => {
      this.config = appConfig;
    });
  }

  get apiUrl(): string {
    if (!this.config) {
      throw new Error('Configuration has not been loaded');
    }
    return this.config.apiUrl;
  }
}
