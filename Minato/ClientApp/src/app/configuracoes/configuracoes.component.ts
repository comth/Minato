import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

interface Node {
  name: string;
  children?: Node[];
}

const TREE_DATA: Node[] = [
  {
    name: 'Mesas',
    children: [
      { name: 'Status' }
    ]
  }, {
    name: 'Entregas',
  }
];

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.css']
})

export class ConfiguracoesComponent implements OnInit {

  treeControl = new NestedTreeControl<Node>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Node>();
  nodeSelecionado: Node;

  ngOnInit(): void {
  }

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  click(data: any) {
    this.nodeSelecionado = data;
  }

  hasChild = (_: number, node: Node) => !!node.children && node.children.length > 0;

}
