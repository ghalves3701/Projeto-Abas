document.addEventListener("DOMContentLoaded", () => {
  // ===== Controle das abas =====
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const id = tab.getAttribute('data-aba');

      document.querySelectorAll('.aba').forEach(aba => aba.classList.remove('ativa'));
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

      const alvo = document.getElementById(id);
      if (alvo) {
        alvo.classList.add('ativa');
        tab.classList.add('active');
      }
    });
  });

  // ===== Funções auxiliares =====
  function formatarData(input) {
    let valor = input.value.replace(/\D/g, "");
    if (valor.length === 8) {
      const dia = valor.substring(0, 2);
      const mes = valor.substring(2, 4);
      const ano = valor.substring(4, 8);
      input.value = `${dia}/${mes}/${ano}`;
    }
  }

  function validarDataInput(input) {
    formatarData(input);
    const valor = (input.value || "").trim();
    if (!valor) return;

    const partes = valor.split('/');
    if (partes.length !== 3) {
      alert("Data inválida: " + valor);
      input.value = "";
      return;
    }

    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10);
    const ano = parseInt(partes[2], 10);
    const data = new Date(ano, mes - 1, dia);

    const invalida =
      data.getFullYear() !== ano ||
      data.getMonth() + 1 !== mes ||
      data.getDate() !== dia;

    if (invalida) {
      alert("Data inválida: " + valor);
      input.value = "";
    }
  }

  function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true;
  }

  // ===== Máscaras com Inputmask =====
  if (typeof Inputmask !== "undefined") {
    const mData = { mask: "99/99/9999" };
    const mCPF = { mask: "999.999.999-99" };
    const mRG = { mask: "99.999.999-9" };
    const mCEP = { mask: "99999-999" };
    const mTel = { mask: "(99) 9999-9999[9]" };

    const sel = q => document.querySelector(q);

    // Dados pessoais
    Inputmask(mCPF).mask(sel('input[name="cpf"]'));
    Inputmask(mRG).mask(sel('input[name="rg"]'));
    Inputmask(mCEP).mask(sel('input[name="cep"]'));
    Inputmask(mTel).mask(sel('input[name="telResidencial"]'));
    Inputmask(mTel).mask(sel('input[name="telCelular"]'));
    Inputmask(mData).mask(sel('input[name="dataNascimento"]'));
    Inputmask(mData).mask(sel('input[name="dataEmissao"]'));

    // Dados estudantis
    const telefonesEstudantis = [
      'input[name="infantilTelefone"]',
      'input[name="fundamentalTelefone"]',
      'input[name="medioTelefone"]',
      'input[name="superiorTelefone"]'
    ];

    const datasEstudantis = [
      'input[name="infantilDataInicial"]',
      'input[name="infantilDataFinal"]',
      'input[name="fundamentalDataInicial"]',
      'input[name="fundamentalDataFinal"]',
      'input[name="medioDataInicial"]',
      'input[name="medioDataFinal"]',
      'input[name="superiorDataInicial"]',
      'input[name="superiorDataFinal"]'
    ];

    telefonesEstudantis.forEach(s => {
      const el = sel(s);
      if (el) Inputmask(mTel).mask(el);
    });

    datasEstudantis.forEach(s => {
      const el = sel(s);
      if (el) Inputmask(mData).mask(el);
    });
  }

  // ===== Validação de datas =====
  document.querySelectorAll('input[name="dataNascimento"], input[name="dataEmissao"]')
    .forEach(input => input.addEventListener('blur', () => validarDataInput(input)));

  document.querySelectorAll(`
    input[name="infantilDataInicial"],
    input[name="infantilDataFinal"],
    input[name="fundamentalDataInicial"],
    input[name="fundamentalDataFinal"],
    input[name="medioDataInicial"],
    input[name="medioDataFinal"],
    input[name="superiorDataInicial"],
    input[name="superiorDataFinal"]
  `).forEach(input => input.addEventListener('blur', () => validarDataInput(input)));

  // ===== Validação de CPF =====
  const campoCPF = document.querySelector('input[name="cpf"]');
  if (campoCPF) {
    campoCPF.addEventListener('blur', () => {
      if (campoCPF.value && !validarCPF(campoCPF.value)) {
        alert("CPF inválido: " + campoCPF.value);
        campoCPF.value = "";
      }
    });
  }

  // ===== Validação de e-mail =====
  const campoEmail = document.querySelector('input[name="email"]');
  if (campoEmail) {
    campoEmail.addEventListener('blur', () => {
      const email = campoEmail.value.trim();
      if (!email) return;
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regexEmail.test(email)) {
        alert("E-mail inválido: " + email);
        campoEmail.value = "";
      }
    });
  }

  // ===== Controle de campos de endereço =====
  const campoCEP = document.querySelector('input[name="cep"]');
  const camposEndereco = [
    'input[name="rua"]',
    'input[name="numero"]',
    'input[name="complemento"]',
    'input[name="bairro"]',
    'input[name="cidade"]',
    'input[name="estado"]'
  ].map(sel => document.querySelector(sel));

  function setEnderecoHabilitado(habilitar) {
    camposEndereco.forEach(campo => {
      if (campo) campo.disabled = !habilitar;
    });
  }

  setEnderecoHabilitado(false);

  if (campoCEP) {
    campoCEP.addEventListener('blur', () => {
      let cep = campoCEP.value.replace(/\D/g, '');
      if (cep.length !== 8) {
        alert("CEP inválido!");
        setEnderecoHabilitado(false);
        return;
      }

      setEnderecoHabilitado(false);

      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(r => r.json())
        .then(data => {
          if (data.erro) {
            alert("CEP não encontrado!");
            return;
          }

          if (camposEndereco[0]) camposEndereco[0].value = data.logradouro || "";
          if (camposEndereco[3]) camposEndereco[3].value = data.bairro || "";
          if (camposEndereco[4]) camposEndereco[4].value = data.localidade || "";
          if (camposEndereco[5]) camposEndereco[5].value = data.uf || "";

          setEnderecoHabilitado(true);
        })
        .catch(() => {
          alert("Erro ao consultar o CEP!");
          setEnderecoHabilitado(false);
        });
    });
  }

    // ===== Submissão dos formulários =====
  const formPessoal = document.getElementById('dadosPessoais');
  const msgSucesso = document.getElementById('mensagemSucesso');
  if (formPessoal) {
    formPessoal.addEventListener('submit', e => {
      e.preventDefault();
      if (!formPessoal.checkValidity()) {
        alert("Por favor, preencha todos os campos obrigatórios corretamente.");
        return;
      }
      if (msgSucesso) {
        msgSucesso.classList.add("visivel");
        setTimeout(() => {
          msgSucesso.classList.remove("visivel");
        }, 5000);
      } else {
        alert("Cadastro realizado com sucesso!");
      }
    });
  }

  const formEstudantis = document.getElementById('dadosEstudantis');
  if (formEstudantis) {
    formEstudantis.addEventListener('submit', e => {
      e.preventDefault();
      if (!formEstudantis.checkValidity()) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
      }
      alert("Dados estudantis salvos com sucesso!");
    });
  }
});
  fetch("Tabela_dinamica_rev4/cadastro.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("tabelaDinamica").innerHTML = data;
    });
