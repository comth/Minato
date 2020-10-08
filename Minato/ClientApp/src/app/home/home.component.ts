import { Component } from '@angular/core';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  constructor(private produtoService: ProdutoService) {
  }

  ngOnInit() {
    //this.post();
  }

  post() {
    let produto = {
      IdProduto: 6,
      Nome: "batata",
      Preco: 12
    }
    this.produtoService.post(produto).subscribe(data => {
      console.log(data);
      this.getAll();
    });
  }

  getAll() {
    this.produtoService.getAll().subscribe(data => {
      console.log(data);
    });
  }
}
