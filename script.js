// ==========================================================================
// 1. NAVEGAÇÃO ENTRE ABAS
// ==========================================================================
function nav(id) {
    // Remove 'active' de todas as seções
    const secoes = document.querySelectorAll('.tab-content');
    secoes.forEach(s => s.classList.remove('active'));

    // Mostra a seção desejada
    const secaoAtiva = document.getElementById(id);
    if (secaoAtiva) {
        secaoAtiva.classList.add('active');
        window.scrollTo(0, 0);
    } else {
        console.error("Seção não encontrada: " + id);
    }

    // Atualiza o visual dos itens da sidebar
    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
    
    // Tenta encontrar o botão que foi clicado para marcar como ativo
    const linkAtivo = document.querySelector(`[onclick="nav('${id}')"]`);
    if (linkAtivo) linkAtivo.classList.add('active');
}

// ==========================================================================
// 2. FUNÇÕES QUE ESTAVAM FALTANDO (DROPDOWN E TEMA)
// ==========================================================================
function toggleDropdown(btn) {
    const container = btn.nextElementSibling;
    const arrow = btn.querySelector('.arrow') || btn.querySelector('i.fas.fa-chevron-down');
    
    if (!container) return;

    const isVisible = container.style.display === "block";
    container.style.display = isVisible ? "none" : "block";
    
    // Gira a setinha se ela existir
    if (arrow) {
        arrow.style.transform = isVisible ? "rotate(0deg)" : "rotate(180deg)";
        arrow.style.transition = "0.3s";
    }
}

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light-mode');
    
    // Salva a preferência
    const isLight = body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// ==========================================================================
// 3. CALCULADORA E LISTA DE ALIMENTOS
// ==========================================================================
function calcularTMB() {
    const sexo = document.getElementById('tmb-sexo').value;
    const peso = parseFloat(document.getElementById('tmb-peso').value);
    const altura = parseFloat(document.getElementById('tmb-altura').value);
    const idade = parseFloat(document.getElementById('tmb-idade').value);
    const atividade = parseFloat(document.getElementById('tmb-atividade').value);
    const res = document.getElementById('tmb-resultado');

    if (!peso || !altura || !idade) {
        alert("Ops! Faltam dados para o cálculo.");
        return;
    }

    let tmb = (sexo === 'm') 
        ? (10 * peso) + (6.25 * altura) - (5 * idade) + 5 
        : (10 * peso) + (6.25 * altura) - (5 * idade) - 161;

    const tdee = tmb * atividade;

    res.innerHTML = `
        <div class="result-display">
            <div class="result-item">
                <span>Metabolismo Basal (TMB):</span>
                <strong>${Math.round(tmb)} kcal</strong>
            </div>
            <div class="result-item" style="border:none;">
                <span>Gasto Diário Total (GET):</span>
                <span style="color:var(--primary); font-size: 1.5rem; font-weight: 800;">${Math.round(tdee)} kcal</span>
            </div>
            <div style="margin-top: 15px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <div style="background: rgba(239, 68, 68, 0.1); padding: 10px; border-radius: 8px; text-align: center;">
                    <small>Cutting (-500kcal)</small><br><strong>${Math.round(tdee - 500)}</strong>
                </div>
                <div style="background: rgba(16, 185, 129, 0.1); padding: 10px; border-radius: 8px; text-align: center;">
                    <small>Bulking (+300kcal)</small><br><strong>${Math.round(tdee + 300)}</strong>
                </div>
            </div>
        </div>
    `;
}

const baseAlimentos = [
    // PROTEÍNAS E CARNES
    { nome: "Peito de Frango Grelhado", p: 32, c: 0, g: 2.5, kcal: 159 },
    { nome: "Sobrecoxa de Frango (sem pele)", p: 25, c: 0, g: 7, kcal: 163 },
    { nome: "Carne de Patinho Moído", p: 35.9, c: 0, g: 7.3, kcal: 219 },
    { nome: "Filet Mignon", p: 26, c: 0, g: 4, kcal: 143 },
    { nome: "Alcatra Grelhada", p: 31.9, c: 0, g: 11.6, kcal: 241 },
    { nome: "Contra Filé (sem gordura)", p: 29, c: 0, g: 8, kcal: 194 },
    { nome: "Lombo de Porco Assado", p: 31, c: 0, g: 8.5, kcal: 210 },
    { nome: "Copa Lombo Grelhada", p: 24, c: 0, g: 12, kcal: 212 },

    // PEIXES E FRUTOS DO MAR
    { nome: "Tilápia Grelhada", p: 26, c: 0, g: 2.7, kcal: 128 },
    { nome: "Salmão Grelhado", p: 25, c: 0, g: 14, kcal: 229 },
    { nome: "Atum em Lata (em conserva)", p: 26, c: 0, g: 0.8, kcal: 116 },
    { nome: "Sardinha em Lata (óleo)", p: 24, c: 0, g: 12, kcal: 208 },
    { nome: "Camarão Cozido", p: 24, c: 0.2, g: 0.3, kcal: 99 },
    { nome: "Bacalhau Cozido", p: 19, c: 0, g: 1.3, kcal: 91 },

    // OVOS E LATICÍNIOS
    { nome: "Ovo Cozido (unidade)", p: 6.3, c: 0.6, g: 5.3, kcal: 78 },
    { nome: "Ovo Frito (unidade)", p: 6.3, c: 0.6, g: 8.5, kcal: 107 },
    { nome: "Clara de Ovo (unidade)", p: 3.6, c: 0.2, g: 0, kcal: 17 },
    { nome: "Leite Desnatado (200ml)", p: 6, c: 10, g: 0, kcal: 70 },
    { nome: "Leite Integral (200ml)", p: 6, c: 10, g: 7, kcal: 120 },
    { nome: "Iogurte Natural", p: 7, c: 9, g: 7, kcal: 126 },
    { nome: "Queijo Cottage", p: 11, c: 3.4, g: 4.3, kcal: 98 },
    { nome: "Queijo Minas Frescal", p: 17.4, c: 3.2, g: 18, kcal: 243 },
    { nome: "Queijo Muçarela", p: 22, c: 3, g: 20, kcal: 280 },
    { nome: "Queijo Parmesão", p: 38, c: 4, g: 29, kcal: 431 },
    { nome: "Ricota", p: 12, c: 3, g: 13, kcal: 174 },

    // CARBOIDRATOS E GRÃOS
    { nome: "Arroz Branco Cozido", p: 2.5, c: 28.1, g: 0.2, kcal: 128 },
    { nome: "Arroz Integral Cozido", p: 2.6, c: 25.8, g: 1, kcal: 124 },
    { nome: "Feijão Carioca Cozido", p: 4.8, c: 13.6, g: 0.5, kcal: 76 },
    { nome: "Feijão Preto Cozido", p: 6, c: 14, g: 0.5, kcal: 91 },
    { nome: "Lentilha Cozida", p: 9, c: 20, g: 0.4, kcal: 116 },
    { nome: "Grão de Bico Cozido", p: 8.9, c: 27, g: 2.6, kcal: 164 },
    { nome: "Macarrão Branco Cozido", p: 5.8, c: 31, g: 0.9, kcal: 158 },
    { nome: "Macarrão Integral Cozido", p: 5.3, c: 26, g: 0.5, kcal: 124 },
    { nome: "Aveia em Flocos", p: 14, c: 66, g: 8.5, kcal: 394 },
    { nome: "Quinoa Cozida", p: 4.4, c: 21, g: 1.9, kcal: 120 },
    { nome: "Cuscuz Paulista", p: 2.3, c: 23, g: 0.2, kcal: 112 },
    { nome: "Tapioca (goma pronta)", p: 0, c: 54, g: 0, kcal: 240 },
    { nome: "Pão Francês (unidade)", p: 4.5, c: 29, g: 1.5, kcal: 150 },
    { nome: "Pão de Forma Integral", p: 9.4, c: 45, g: 3.5, kcal: 245 },

    // TUBÉRCULOS
    { nome: "Batata Doce Cozida", p: 0.6, c: 18.4, g: 0.1, kcal: 77 },
    { nome: "Batata Inglesa Cozida", p: 1.2, c: 11.9, g: 0, kcal: 52 },
    { nome: "Mandioca/Aipim Cozido", p: 0.6, c: 30, g: 0.3, kcal: 125 },
    { nome: "Inhame Cozido", p: 1.5, c: 28, g: 0.2, kcal: 118 },
    { nome: "Mandioquinha/Batata Baroa", p: 0.9, c: 19, g: 0.2, kcal: 80 },

    // FRUTAS
    { nome: "Banana Prata", p: 1.3, c: 26, g: 0.1, kcal: 98 },
    { nome: "Banana Nanica", p: 1.1, c: 24, g: 0.3, kcal: 92 },
    { nome: "Maçã (com casca)", p: 0.3, c: 13.8, g: 0.2, kcal: 52 },
    { nome: "Abacate", p: 2, c: 8.5, g: 14.7, kcal: 160 },
    { nome: "Mamão Papaia", p: 0.5, c: 11, g: 0.1, kcal: 43 },
    { nome: "Abacaxi", p: 0.5, c: 13, g: 0.1, kcal: 50 },
    { nome: "Uva Italiana", p: 0.7, c: 17, g: 0.2, kcal: 68 },
    { nome: "Laranja (unidade)", p: 1, c: 12, g: 0.1, kcal: 47 },
    { nome: "Morango", p: 0.7, c: 7.7, g: 0.3, kcal: 33 },
    { nome: "Melancia", p: 0.6, c: 7.5, g: 0.1, kcal: 30 },
    { nome: "Manga Palmer", p: 0.5, c: 19, g: 0.3, kcal: 72 },
    { nome: "Limão", p: 1.1, c: 9, g: 0.3, kcal: 29 },
    { nome: "Coco (polpa)", p: 3.3, c: 15, g: 33, kcal: 354 },

    // VEGETAIS E LEGUMES
    { nome: "Brócolis Cozido", p: 2.1, c: 4.4, g: 0.5, kcal: 25 },
    { nome: "Couve-Flor Cozida", p: 1.9, c: 5, g: 0.3, kcal: 25 },
    { nome: "Espinafre Cozido", p: 3, c: 3.6, g: 0.4, kcal: 23 },
    { nome: "Abóbora Cabotiá Cozida", p: 2, c: 10, g: 0.7, kcal: 48 },
    { nome: "Cenoura Crua", p: 0.9, c: 9.6, g: 0.2, kcal: 41 },
    { nome: "Beterraba Crua", p: 1.6, c: 10, g: 0.2, kcal: 43 },
    { nome: "Abobrinha Cozida", p: 1.2, c: 3.1, g: 0.3, kcal: 17 },
    { nome: "Chuchu Cozido", p: 0.7, c: 4.1, g: 0.1, kcal: 19 },
    { nome: "Alface Crespa", p: 1.3, c: 1.7, g: 0.2, kcal: 11 },
    { nome: "Pepino (com casca)", p: 0.7, c: 3.6, g: 0.1, kcal: 15 },
    { nome: "Tomate Comum", p: 0.9, c: 3.9, g: 0.2, kcal: 18 },

    // GORDURAS E OLEAGINOSAS
    { nome: "Azeite de Oliva (colher sopa)", p: 0, c: 0, g: 13.5, kcal: 119 },
    { nome: "Pasta de Amendoim", p: 25, c: 20, g: 50, kcal: 588 },
    { nome: "Amêndoa", p: 21, c: 22, g: 50, kcal: 579 },
    { nome: "Castanha do Pará (unid)", p: 0.5, c: 0.5, g: 2.5, kcal: 26 },
    { nome: "Castanha de Caju", p: 18, c: 30, g: 44, kcal: 553 },
    { nome: "Nozes", p: 15, c: 14, g: 65, kcal: 654 },
    { nome: "Manteiga (com sal)", p: 0.8, c: 0, g: 81, kcal: 717 },

    // SUPLEMENTOS E OUTROS
    { nome: "Whey Protein (concentrado)", p: 80, c: 10, g: 6, kcal: 400 },
    { nome: "Creatina (porção 3g)", p: 0, c: 0, g: 0, kcal: 0 },
    { nome: "Albumina em pó", p: 82, c: 4, g: 0, kcal: 344 },
    { nome: "Açúcar Branco", p: 0, c: 100, g: 0, kcal: 387 },
    { nome: "Mel de Abelha", p: 0.3, c: 82, g: 0, kcal: 304 },
    { nome: "Chocolate Amargo 70%", p: 7.8, c: 46, g: 43, kcal: 598 }
];

function carregarAlimentos() {
    const lista = document.getElementById('lista-alimentos');
    if (!lista) return;

    lista.innerHTML = baseAlimentos.map(a => `
        <tr style="border-bottom: 1px solid var(--border);">
            <td style="padding:15px 10px;">${a.nome}</td>
            <td style="color:#6366f1">${a.p}g</td>
            <td style="color:#f59e0b">${a.c}g</td>
            <td style="color:#10b981">${a.g}g</td>
            <td style="font-weight:bold;">${a.kcal}</td>
        </tr>
    `).join('');
}

// ==========================================================================
// 4. INICIALIZAÇÃO
// ==========================================================================
window.onload = () => {
    // Carrega o tema salvo
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
    }

    nav('inicio'); 
    carregarAlimentos();
};
// Função para mostrar/esconder a tabela
function toggleTabela() {
    const container = document.getElementById('tabela-container');
    if (container.style.display === 'none') {
        container.style.display = 'block';
    } else {
        container.style.display = 'none';
    }
}

// Função simples para "ampliar" a imagem (Lightbox)
function abrirLightbox(elemento) {
    const img = elemento.querySelector('img');
    const overlay = document.createElement('div');
    
    // Estilo do fundo preto
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.9)';
    overlay.style.zIndex = '10000';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.cursor = 'zoom-out';
    
    // A imagem ampliada
    const imgClone = document.createElement('img');
    imgClone.src = img.src;
    imgClone.style.maxWidth = '95%';
    imgClone.style.maxHeight = '95%';
    imgClone.style.borderRadius = '8px';
    
    overlay.appendChild(imgClone);
    document.body.appendChild(overlay);
    
    // Fecha ao clicar
    overlay.onclick = () => overlay.remove();
}
const minhasFrases = [
    "Seu corpo é um laboratório, trate-o com precisão.",
    "O metabolismo é a orquestra da vida; a nutrição é o maestro.",
    "A disciplina é a ponte entre metas e realizações.",
    "Cada molécula de ATP gerada é um passo rumo ao seu objetivo.",
    "O conhecimento em bioquímica é o seu maior ergogênico."
    // Adicione as suas aqui entre aspas e separadas por vírgula
];

function gerarNovaFrase() {
    const texto = document.getElementById('frase-texto');
    if (!texto) return;

    // Sorteio aleatório
    const r = Math.floor(Math.random() * minhasFrases.length);
    
    // Efeito visual de troca
    texto.style.opacity = 0;
    setTimeout(() => {
        texto.innerText = `"${minhasFrases[r]}"`;
        texto.style.opacity = 1;
    }, 250);
}

// No seu window.onload, adicione a chamada:
window.addEventListener('DOMContentLoaded', () => {
    gerarNovaFrase(); // Carrega uma frase assim que abre
});
// ==========================================================================
// 1. BANCO DE FRASES (SISTEMA DE OBJETOS)
// ==========================================================================
var frasesSistema = [
    // BIOQUÍMICA E CIÊNCIA
    { texto: "A bioquímica é a linguagem da vida em sua escala mais fundamental.", autor: "NutriScience Pro" },
    { texto: "O metabolismo não é apenas sobre calorias, é sobre sinalização celular.", autor: "Dr. Bruce Ames" },
    { texto: "A sinalização da mTOR é o interruptor mestre do anabolismo celular.", autor: "Bioquímica Aplicada" },
    { texto: "A glicólise é a poesia da quebra da glicose para gerar energia.", autor: "Ciência da Performance" },
    { texto: "Somos o resultado bioquímico do que conseguimos absorver e metabolizar.", autor: "Nutrologia Moderna" },

    // FILOSOFIA E SAÚDE
    { texto: "Que seu remédio seja seu alimento, e que seu alimento seja seu remédio.", autor: "Hipócrates" },
    { texto: "O homem é o que ele come.", autor: "Ludwig Feuerbach" },
    { texto: "A saúde é a maior das vitórias; a paz, a maior das riquezas.", autor: "Siddhartha Gautama" },
    { texto: "Comer é uma necessidade, mas comer de forma inteligente é uma arte.", autor: "François de La Rochefoucauld" },
    { texto: "A nutrição é a única ciência que entra no seu corpo três vezes ao dia.", autor: "Anônimo" },

    // PERFORMANCE E DISCIPLINA
    { texto: "A disciplina é a ponte entre metas e conquistas.", autor: "Jim Rohn" },
    { texto: "Sua genética carrega a arma, mas seu estilo de vida puxa o gatilho.", autor: "Dr. Francis Collins" },
    { texto: "O corpo humano é a máquina mais complexa do universo; trate-a com respeito.", autor: "Performance Humana" },
    { texto: "Não se gerencia o que não se mede.", autor: "William Edwards Deming" },
    { texto: "A excelência não é um ato, mas um hábito.", autor: "Aristóteles" },

    // MOTIVACIONAIS CURTAS
    { texto: "Foco, nutrição e bioquímica.", autor: "Mantra NutriScience" },
    { texto: "Pequenas mudanças moleculares geram grandes resultados físicos.", autor: "Ciência do Esporte" },
    { texto: "A consistência vence a intensidade no longo prazo.", autor: "Coach de Performance" },
    { texto: "Educar a mente sem educar o corpo não é educação.", autor: "Aristóteles" },
    { texto: "Transforme sua biologia através da sua vontade.", autor: "Evolução Constante" }
];

// ==========================================================================
// 2. LÓGICA DE ATUALIZAÇÃO DA FRASE
// ==========================================================================
function gerarNovaFrase() {
    const textoEl = document.getElementById('frase-texto');
    const autorEl = document.getElementById('frase-autor');
    
    if (!textoEl || !autorEl) return;

    // Sorteia um objeto do array
    const indice = Math.floor(Math.random() * frasesSistema.length);
    const selecionada = frasesSistema[indice];

    // Efeito de fade out (suave)
    textoEl.style.opacity = 0;
    autorEl.style.opacity = 0;

    setTimeout(() => {
        textoEl.innerText = `"${selecionada.texto}"`;
        autorEl.innerText = `— ${selecionada.autor}`;
        
        // Fade in
        textoEl.style.opacity = 1;
        autorEl.style.opacity = 1;
    }, 250);
}
// Função para renderizar os gráficos quando a aba for aberta
function renderizarGraficos() {
    // --- GRÁFICO DE LACTATO ---
    const ctxLactato = document.getElementById('chartLactato').getContext('2d');
    new Chart(ctxLactato, {
        type: 'line',
        data: {
            labels: ['10km/h', '12km/h', '14km/h', '16km/h', '18km/h', '20km/h'],
            datasets: [{
                label: 'Lactato (mmol/L)',
                data: [1.2, 1.5, 2.1, 4.0, 7.8, 12.5], // O salto no 4.0 é o limiar
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.2)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#cbd5e1' } },
                x: { grid: { display: false }, ticks: { color: '#cbd5e1' } }
            },
            plugins: { legend: { labels: { color: '#fff' } } }
        }
    });

    // --- GRÁFICO DE DIABETES ---
    const ctxDiabetes = document.getElementById('chartDiabetes').getContext('2d');
    new Chart(ctxDiabetes, {
        type: 'line',
        data: {
            labels: ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
            datasets: [{
                label: 'Glicemia (mg/dL)',
                data: [95, 140, 110, 155, 125, 105],
                borderColor: '#3498db',
                borderDash: [5, 5],
                tension: 0.3,
                pointBackgroundColor: '#2ecc71'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#cbd5e1' } },
                x: { ticks: { color: '#cbd5e1' } }
            },
            plugins: { legend: { labels: { color: '#fff' } } }
        }
    });
}

// Chame essa função dentro da sua função nav() para garantir que o gráfico carregue
// Exemplo: if(id === 'lactato') renderizarGraficos();
// FUNÇÃO PARA COMPARTILHAR O SITE
function compartilharSite() {
    if (navigator.share) {
        navigator.share({
            title: 'NutriScience Pro',
            text: 'Confira esta ferramenta incrível de Bioquímica e Nutrição!',
            url: window.location.href
        }).then(() => {
            console.log('Compartilhado com sucesso!');
        }).catch((error) => {
            console.log('Erro ao compartilhar:', error);
        });
    } else {
        // Caso o navegador não suporte a API de compartilhamento (ex: PC)
        alert("Copiado para a área de transferência: " + window.location.href);
        navigator.clipboard.writeText(window.location.href);
    }
}

// FUNÇÃO PARA EXPORTAR PDF (SIMPLES E EFICAZ)
function exportarSecaoPDF(idSecao, nomeArquivo) {
    const conteudo = document.getElementById(idSecao);
    if (!conteudo) {
        alert("Erro: Seção não encontrada!");
        return;
    }

    // Abre a janela de impressão do navegador focada na seção ou usa o print padrão
    // Dica: Para um PDF profissional mesmo, seria necessário a biblioteca html2pdf.
    // Mas o comando abaixo já ativa a função de salvar como PDF do navegador:
    window.print();
}
// Verifique se este nome está EXATAMENTE igual ao do onclick do seu botão
function postarComentario() {
    const nomeInput = document.getElementById('comentario-nome');
    const textoInput = document.getElementById('comentario-texto');
    // Pegando o mural pelo ID que está na sua seção "Comunidade"
    const muralDiv = document.getElementById('lista-comentarios');

    if (!nomeInput.value.trim() || !textoInput.value.trim()) {
        alert("Ops! Digite seu nome e sua mensagem. 😉");
        return;
    }

    // Criando o elemento
    const novoComentario = document.createElement('div');
    
    // Estilos bem fortes para garantir que ele apareça (Fundo azul escuro, borda roxa)
    novoComentario.style.cssText = "background: #2d3748; padding: 20px; border-radius: 15px; margin-bottom: 20px; border: 2px solid #6366f1; color: white; display: block !important; visibility: visible !important; opacity: 1 !important;";

    const data = new Date().toLocaleDateString('pt-BR');

    novoComentario.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <strong style="color: #818cf8; font-size: 1.1rem;">${nomeInput.value}</strong>
            <span style="font-size: 0.8rem; opacity: 0.7;">${data}</span>
        </div>
        <p style="line-height: 1.6; color: #e2e8f0;">${textoInput.value}</p>
    `;

    if (muralDiv) {
        muralDiv.prepend(novoComentario);
        
        // FOCO: Faz a tela descer até o comentário novo
        novoComentario.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Limpar campos
        nomeInput.value = "";
        textoInput.value = "";
    } else {
        // Se der este erro, o ID no HTML é diferente de "lista-comentarios"
        alert("Erro: Não encontrei o espaço dos comentários. Verifique o ID no HTML.");
    }
}
function simularDigestao(tipo) {
    const res = document.getElementById('resultado-digestao');
    let texto = "";

    if (tipo === 'carb') {
        texto = "🍞 <strong>Carboidratos:</strong> A digestão começa na boca (amilase salivar), para no estômago (pH ácido inativa a amilase) e termina no intestino com a amilase pancreática e dissacaridases (lactase, maltase, sucrase).";
    } else if (tipo === 'prot') {
        texto = "🥩 <strong>Proteínas:</strong> Começa no estômago com o HCl desnaturando a proteína e a pepsina quebrando cadeias. No duodeno, as proteases pancreáticas (tripsina e quimiotripsina) finalizam em aminoácidos.";
    } else if (tipo === 'lip') {
        texto = "🥑 <strong>Lipídios:</strong> Exigem a bile para emulsificação. Sem a bile (emulsificante), a lipase pancreática não consegue acessar a gordura para quebrá-la em ácidos graxos e glicerol.";
   } else if (tipo === 'fibra') {
        texto = "🥗 <strong>Fibras:</strong> Não são digeridas por enzimas humanas. No intestino grosso, são fermentadas pela microbiota, produzindo <strong>AGCC</strong> e auxiliando na formação do bolo fecal.";
    }

    res.innerHTML = texto;
    res.style.border = "1px solid #10b981";
    res.style.animation = "fadeIn 0.5s";
}