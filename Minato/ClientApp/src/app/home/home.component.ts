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
    
  }
}
