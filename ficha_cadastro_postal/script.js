// Utilidades
const onlyDigits = (v) => (v || '').replace(/\D/g, '');

// ===== Máscara de telefone (10 ou 11 dígitos) =====
function mascaraTelefone(input){
  const d = onlyDigits(input.value);
  if (d.length <= 10){
    // (00) 0000-0000
    input.value = d
      .replace(/^(\d{0,2})/, '($1')
      .replace(/^\((\d{2})(\d{0,4})/, '($1) $2')
      .replace(/(\d{4})(\d{1,4})$/, '$1-$2')
      .replace(/\((\d{1,2})\)$/,'($1'); // evita fechar cedo
  } else {
    // (00) 00000-0000
    input.value = d
      .replace(/^(\d{0,2})/, '($1')
      .replace(/^\((\d{2})(\d{0,5})/, '($1) $2')
      .replace(/(\d{5})(\d{1,4})$/, '$1-$2')
      .replace(/\((\d{1,2})\)$/,'($1');
  }
}

// ===== Formatação de moeda BRL =====
const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
function mascaraMoeda(input){
  const d = onlyDigits(input.value);
  if (!d) { input.value = ''; return; }
  const value = Number(d) / 100;
  input.value = brl.format(value);
}

// ===== Validação de CPF =====
function validarCPFValue(cpfRaw){
  const cpf = onlyDigits(cpfRaw);
  if (cpf.length !== 11) return false;
  if (/^(\d)+$/.test(cpf)) return false; // todos dígitos iguais
  // dígito 1
  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i],10) * (10 - i);
  let resto = 11 - (soma % 11);
  const dig1 = (resto >= 10) ? 0 : resto;
  if (dig1 !== parseInt(cpf[9],10)) return false;
  // dígito 2
  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf[i],10) * (11 - i);
  resto = 11 - (soma % 11);
  const dig2 = (resto >= 10) ? 0 : resto;
  return dig2 === parseInt(cpf[10],10);
}

function validarCPF(input){
  const ok = validarCPFValue(input.value);
  const errorBox = input.parentElement.querySelector('.error');
  if (!ok){
    input.setCustomValidity('CPF inválido.');
    if (errorBox) errorBox.textContent = 'CPF inválido.';
  } else {
    input.setCustomValidity('');
    if (errorBox) errorBox.textContent = '';
  }
}

// ===== ViaCEP =====
async function buscarEndereco(cepRaw, tipo){
  const cep = onlyDigits(cepRaw);
  if (cep.length !== 8) return;

  try{
    const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await resp.json();
    if (!data.erro){
      const sel = `[name=endereco_${tipo}]`;
      const el = document.querySelector(sel);
      if (el){
        const parts = [data.logradouro, data.bairro, `${data.localidade} - ${data.uf}`]
          .filter(Boolean)
          .join(', ');
        el.value = parts;
      }
    } else {
      alert('CEP não encontrado');
    }
  } catch (e){
    alert('Erro ao buscar o CEP');
  }
}

// ===== Inicialização =====
document.addEventListener('DOMContentLoaded', () => {
  // telefone
  document.querySelectorAll('[data-mask="tel"]').forEach(inp => {
    inp.addEventListener('input', () => mascaraTelefone(inp));
  });

  // moeda
  const valorEntrega = document.getElementById('valorEntrega');
  if (valorEntrega){
    valorEntrega.addEventListener('input', () => mascaraMoeda(valorEntrega));
    valorEntrega.addEventListener('blur', () => mascaraMoeda(valorEntrega));
  }

  // cpf
  document.querySelectorAll('[data-cpf]').forEach(inp => {
    inp.addEventListener('blur', () => validarCPF(inp));
  });

  // cep -> viaCEP
  document.querySelectorAll('[data-cep]').forEach(inp => {
    inp.addEventListener('blur', () => {
      const tipo = inp.getAttribute('data-tipo'); // 'remetente' ou 'destinatario'
      buscarEndereco(inp.value, tipo);
    });
  });

  // submit
  const form = document.getElementById('cadastroPostal');
  form.addEventListener('submit', (e) => {
    // força validação nativa + nossas mensagens
    const invalid = !form.reportValidity();
    if (invalid){
      e.preventDefault();
      return;
    }
    e.preventDefault();

    // Sucesso: feedback + limpar dados
    alert('Cadastro realizado com sucesso!');

    // Limpa o formulário
    form.reset();

    // Limpa mensagens de erro e validações customizadas
    form.querySelectorAll('[data-cpf]').forEach(inp => {
      inp.setCustomValidity('');
      const err = inp.parentElement.querySelector('.error');
      if (err) err.textContent = '';
    });

    // Foca no primeiro campo para agilizar novo cadastro
    const first = form.querySelector('input, select, textarea');
    if (first) first.focus();
  });
});
