import { Injectable, NotFoundException } from "@nestjs/common";

import { Product } from "./products.model";
import { v4 as uuidv4 } from "uuid";
import { productModule } from "./products.module";

@Injectable()
export class ProductService {
  private products: Product[] = [];

  insertProduct(title: string, description: string, price: number) {
    const id = uuidv4();
    const newProduct = new Product(id, title, description, price);
    this.products.push(newProduct);
    return { id, title, description, price };
  }

  getProducts(query: any) {
    if (!query) {
      return { products: [...this.products] };
    } else {
      const product = this.products.find((prod) => prod.id === query);
      if (!product) {
        throw new NotFoundException(
          `Could Not Find Product with the id ${query}`
        );
      }
      return { product: { ...product } };
    }
  }

  updateProduct(query: any,title: string, desc: string, price: number) {
    if (!query) {
      throw new NotFoundException(
        `The Product with the id ${query} no longer exists`
      );
    } else {
      const [product, index] = this.findProduct(query);
      const updatedProduct = {...product}

        if (title) {
          updatedProduct.title = title
        }
        if (desc) {
          updatedProduct.description = desc
        }
        if (price) {
          updatedProduct.price = price
        }

      this.products[index] = updatedProduct
      
      return this.products[index]
    }


  }

  deleteProduct(query: any) {
    const index = this.findProduct(query)[1];
    this.products.splice(index, 1)
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex(product => product.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could Not Find Product.')
    }
    return [product, productIndex];
  }

}
