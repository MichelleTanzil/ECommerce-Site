import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private _http: HttpClient) {}

  getAll() {
    return this._http.get("/hidden-admin-api/items");
  }
  getOne(item_id: string) {
    return this._http.get("/hidden-admin-api/items/" + item_id);
  }
  createItem(newItem: any) {
    return this._http.post("/hidden-admin-api/items", newItem);
  }

  updateItem(itemToUpdate: any) {
    return this._http.put("/hidden-admin-api/items/" + itemToUpdate._id, itemToUpdate);
  }

  deleteItem(itemToDelete_id: string) {
    return this._http.delete("/hidden-admin-api/items/" + itemToDelete_id);
  }

  addToCart(itemId: string) {
    return this._http.get("/api/add-to-cart/" + itemId);
  }

  getCart() {
    return this._http.get("/api/current-cart");
  }
}
