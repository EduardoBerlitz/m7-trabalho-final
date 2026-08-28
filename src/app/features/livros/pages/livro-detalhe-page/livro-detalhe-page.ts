import {
  Component,
  OnInit,
  inject,
  signal
} from "@angular/core";

import {
  ActivatedRoute,
  RouterLink
} from "@angular/router";

import { Livro } from "../../models/livro";
import { LivrosService } from "../../services/livros.service";

@Component({
  selector: "app-livro-detalhe-page",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./livro-detalhe-page.html",
  styleUrl: "./livro-detalhe-page.css"
})
export class LivroDetalhePage implements OnInit {
  private readonly route =
    inject(ActivatedRoute);

  private readonly service =
    inject(LivrosService);

  readonly livro =
    signal<Livro | undefined>(undefined);

  readonly carregando =
    signal(true);

  ngOnInit(): void {
    void this.carregar();
  }

  private async carregar(): Promise<void> {
    const id = Number(
      this.route.snapshot.paramMap.get("id")
    );

    const livro =
      await this.service.buscarPorId(id);

    this.livro.set(livro);
    this.carregando.set(false);
  }
}
