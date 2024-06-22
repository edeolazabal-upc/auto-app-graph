import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auto } from '../model/auto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BrandSummary } from '../model/summary';

 const base_url = "http://localhost:3000/autos"
// const base_url = "https://scaling-fortnight-r75vg654x53xw4q-3000.app.github.dev/autos"
//const base_url = 'http://127.0.0.1:3000/autos'
//const base_url = 'http://localhost:8081/api/auto'

@Injectable({
  providedIn: 'root'
})
export class AutoService {

  constructor(private http: HttpClient) { }

  getAutos() {
    const endpoint = `${base_url}`;
    return this.http.get<Auto[]>(endpoint)
  }
  getAutosById(id: any) {
    const endpoint = `${base_url}/${id}`;
    return this.http.get<Auto[]>(endpoint)
  }
  saveAuto(body: any) {
    const endpoint = `${base_url}`;
    return this.http.post<Auto>(endpoint, body)
  }
  updateAuto(body: any, id: any) {
    const endpoint = `${base_url}/${id}`;
    return this.http.put<Auto>(endpoint, body)
  }
  deleteAuto(id: any) {
    const endpoint = `${base_url}/${id}`;
    return this.http.delete<Auto>(endpoint)
  }
  getBrandSummaries(): Observable<BrandSummary[]> {
    return this.http.get<Auto[]>(`${base_url}`).pipe(
      map(autos => {
        const summaries: { [brand: string]: number } = {};
        autos.forEach(auto => {
          if (!summaries[auto.brand]) {
            summaries[auto.brand] = 0;
          }
          summaries[auto.brand] += auto.price;
        });
        return Object.keys(summaries).map(brand => ({
          brand,
          total: summaries[brand]
        }));
      })
    );
  }
}
