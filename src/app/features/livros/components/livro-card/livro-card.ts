import { Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Livro } from "../../models/livro";

@Component({
  selector: "app-livro-card",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./livro-card.html",
  styleUrl: "./livro-card.css"
})
export class LivroCard {
  livro = input.required<Livro>();
}
