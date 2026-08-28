import { Component, input } from "@angular/core";
import { Livro } from "../../models/livro";
import { LivroCard } from "../livro-card/livro-card";

@Component({
  selector: "app-lista-livros",
  standalone: true,
  imports: [LivroCard],
  templateUrl: "./lista-livros.html"
})
export class ListaLivros {
  livros = input.required<Livro[]>();
  carregando = input(false);
  erro = input<string | null>(null);
}
