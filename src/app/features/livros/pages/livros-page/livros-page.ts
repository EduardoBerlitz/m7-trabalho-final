import {
  Component,
  OnInit,
  computed,
  inject,
  signal
} from "@angular/core";

import { FiltroLivros } from "../../components/filtro-livros/filtro-livros";
import { ListaLivros } from "../../components/lista-livros/lista-livros";
import {
  Livro,
  StatusLivro
} from "../../models/livro";
import { LivrosService } from "../../services/livros.service";

@Component({
  selector: "app-livros-page",
  standalone: true,
  imports: [
    FiltroLivros,
    ListaLivros
  ],
  templateUrl: "./livros-page.html",
  styleUrl: "./livros-page.css"
})
export class LivrosPage implements OnInit {
  private readonly livrosService =
    inject(LivrosService);

  readonly livros =
    signal<Livro[]>([]);

  readonly pesquisa =
    signal("");

  readonly filtroStatus =
    signal<StatusLivro | "todos">("todos");

  readonly carregando =
    signal(false);

  readonly erro =
    signal<string | null>(null);

  readonly exibindoFormulario = signal(false);

  readonly cadastrando = signal(false);

  readonly livrosFiltrados =
    computed(() => {
      const termo =
        this.pesquisa().trim().toLowerCase();

      const status =
        this.filtroStatus();

      return this.livros().filter(livro => {
        const correspondeTexto =
          termo === "" ||
          livro.titulo.toLowerCase().includes(termo) ||
          livro.autor.toLowerCase().includes(termo) ||
          livro.descricao.toLowerCase().includes(termo);

        const correspondeStatus =
          status === "todos" ||
          livro.status === status;

        return correspondeTexto &&
          correspondeStatus;
      });
    });

  ngOnInit(): void {
    void this.carregarLivros();
  }

  async carregarLivros(): Promise<void> {
    this.carregando.set(true);
    this.erro.set(null);

    try {
      const dados =
        await this.livrosService.listar();

      this.livros.set(dados);
    } catch {
      this.erro.set(
        "Não foi possível carregar os livros."
      );
    } finally {
      this.carregando.set(false);
    }
  }

  atualizarPesquisa(valor: string): void {
    this.pesquisa.set(valor);
  }

  atualizarStatus(
    valor: StatusLivro | "todos"
  ): void {
    this.filtroStatus.set(valor);
  }

  alternarFormulario(): void {
    this.exibindoFormulario.update(valor => !valor);
  }

  async cadastrarLivro(event: Event): Promise<void> {
    event.preventDefault();

    const formulario = event.target as HTMLFormElement;
    const dados = new FormData(formulario);

    this.cadastrando.set(true);
    this.erro.set(null);

    try {
      const livro = await this.livrosService.adicionar({
        id: Number(dados.get("id")),
        titulo: String(dados.get("titulo")),
        autor: String(dados.get("autor")),
        categoria: String(dados.get("categoria") ?? "").trim(),
        ano: Number(dados.get("ano")),
        status: dados.get("status") as StatusLivro,
        descricao: String(dados.get("descricao"))
      });

      this.livros.update(livros => [...livros, livro]);
      formulario.reset();
      this.exibindoFormulario.set(false);
    } catch {
      this.erro.set("Não foi possível cadastrar o livro.");
    } finally {
      this.cadastrando.set(false);
    }
  }
}
