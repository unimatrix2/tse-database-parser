# TSE CSV Transpilador

Esse transpilador permite importar dados públicos do TSE (Tribunal Superior Eleitoral) para um servidor MongoDB, 
facilitando análise estatística, processamento e construção de APIs de consulta. A ferramenta usa internamente o
(Paparse)[https://www.npmjs.com/package/papaparse] para prover uma transpilação de dados rápida e precisa, e o
(Mongoose)[https://www.npmjs.com/package/mongoose] como ORM para prover uma API simples para composição de schema
e operações CRUD na base de dados. Essa ferramenta foi criada para oferecer uma transpilação e atualização de bases
existentes de forma simples, uma vez que atualizações dos dados são emitidas via CSV, tornando a atualização de bases
de dados preexistentes uma dor constante.

Utilidade CLI desenvolvida com [Commander.js](https://www.npmjs.com/package/commander) e [Colors.js](https://www.npmjs.com/package/colors).
Outras bibliotecas serão mencionadas quando forem ativamente utilizadas no projeto.

# Uso básico

Para utilizar o transpilador, você precisa:
1. Clonar esse repositório
2. Instalar as dependências
3. Compilar
4. Linkar o projeto

e é isso. Será um processo mais simples quando o pacote for publicado no NPM.

1. ``` git clone https://github.com/unimatrix2/tse-database-parser ```
2. ``` npm install ```
3. ``` npm run build ```
4. ``` npm link ```
5. Utilizar como ``` tseparser <file path> <mongodb uri>```

É importante reforçar que os arquivos utilizados devem seguir o modelo de dados padrão do TSE, tanto para nomenclatura de arquivos CSV quanto para campos do documento. É recomendado utilizar os nomes orignais dos arquivos do acervo digital do TSE (consulta_cand_YYYY.csv), mas qualquer nome de arquivo que contenha o ano da eleição em YYYY é aceito.

Para mais informações sobre o modelo de dados padrão do TSE, o acervo de 1994-2022 contém em cada compactado um arquivo LEIAME com as especificações do modelo.

## Comandos

Por enquanto só há 1 comando base: parse. Outros comandos estão no backlog mas essa ferramenta está sendo desenvolvida
sob demandas/necessidades de um projeto maior, portanto modelagem dinâmica, transpilação para outros formatos e bases de dados
(como JSON, bases SQL), são recursos que não serão implementados por um bom tempo.

```
Uso: tseparser [opções] [comando]

Um simples transpilador de dados via CLI para processar dados CSV do Tribunal Superior Eleitoral do Brasil.

Opções:
- -V, --version   exibe a versão do programa
- -h, --help      exibe a ajuda do programa

Comandos:
- parse           Transpilar dados
- help [comando]  exibe a ajuda do comando
```
### Parse
```
Uso: parse [opções] <arquivo> <MongoDB URI>

Argumentos:
- file          Caminho absoluto do arquivo a ser transpilado
- MongoDB URI   A URI de conexão com o servidor MongoDB que deseja importar os dados

Opções:
- -u, --update  Indica que deseja atualizar uma base de dados já existente
- -h, --help    exibe a ajuda do comando
```
Para ajuda offline, use ``` tseparser -h ``` ou  ``` tseparser parse -h ```