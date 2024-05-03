document.getElementById('updateForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Pegando os novos valores do formulário
  var novoNome = document.getElementById('novoNome').value;
  var novaIdade = document.getElementById('novaIdade').value;
  var novaRua = document.getElementById('rua').value;
  var novoNumero = document.getElementById('numero').value; // Adicione um campo de entrada para o número
  var novoBairro = document.getElementById('bairro').value;
  var novoEstado = document.getElementById('estado').value;
  var novaBio = document.getElementById('novaBio').value;

  // Atualizando os valores na seção de informações do usuário
  document.getElementById('nome').innerText = novoNome;
  document.getElementById('idade').innerText = novaIdade;
  document.getElementById('endereco').innerText = `${novaRua}, ${novoNumero} - ${novoBairro} - ${novoEstado}`;
  document.getElementById('bio').innerText = novaBio;

  // Resetando o formulário
  document.getElementById('updateForm').reset();
});

//Mascara do CEP
document.getElementById('cep').addEventListener('input', function(event) {
  let cep = event.target.value;
  // Remove qualquer caracter não numérico do CEP
  cep = cep.replace(/\D/g, '');
  // Verifica se o comprimento do CEP é maior que 5 e adiciona o hífen
  if (cep.length > 5) {
      event.target.value = cep.slice(0, 5) + '-' + cep.slice(5, 8);
  }
});


//Atualizar a foto
document.getElementById('profilePic').addEventListener('change', function(event) {
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function(event) {
      document.getElementById('profilePicDisplay').src = event.target.result;
  };
  reader.readAsDataURL(file);
});





document.getElementById('cep').addEventListener('blur', function() {
  var cep = this.value.replace(/\D/g, ''); // Remove caracteres não numéricos do CEP

  // Verifica se o CEP possui o tamanho correto
  if (cep.length !== 8) {
      return;
  }

  // Faz a requisição para a API do ViaCEP
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://viacep.com.br/ws/' + cep + '/json/');
  xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          // Preenche os campos com os dados retornados pela API
          document.getElementById('rua').value = data.logradouro;
          document.getElementById('bairro').value = data.bairro;
          document.getElementById('estado').value = data.uf;
      }
  };
  xhr.send();
});
