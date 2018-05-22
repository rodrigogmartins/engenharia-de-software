# DBO-2018-WORKSPACE

Para desenvolver neste _workspace_ é necessário ter instalado o [NodeJS](https://nodejs.org/en/download/) e o [Visual Studio Code](https://code.visualstudio.com/). Tendo essas ferramentas instaladas faça os seguintes procedimentos:

## Extensões necessárias no Visual Studio Code

Extensões essenciais:

- ESLint
- vscode-icons
- HTML Snippets
- HTMLHint
- EditorConfig for VS Code
- Sublime ou Atom Keymap
- Path Intellisense
- TODO Highlight
- REST Client
- IntelliSense for CSS class names
- Beautify

Referência: <https://code.visualstudio.com/docs/editor/extension-gallery>

Opcionais:

- Material Theme
- One Dark Pro
- Power Mode

## Node

A partir da linha de comando, execute `npm install`, isso vai gerar o diretório *node_modules*, que nunca deve ser copiado ou transferido por e-mail por exemplo, já que só depende do arquivo `package.json` para gerar novamente com o comando citado.

## Rodando

Para _rodar_ um projeto execute o comando `npm start diretorio`, por exemplo, para executar o template o comando é `npm start template`. O comando abre o _browser_ padrão, mas podes abrir o projeto em qualquer _browser_ com a URL `http://127.0.0.1:8080`.
