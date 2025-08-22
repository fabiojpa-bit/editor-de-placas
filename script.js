const placaType = document.getElementById('placaType');
const placaText = document.getElementById('placaText');
const placaPhone = document.getElementById('placaPhone');
const placaPreview = document.getElementById('placaPreview');
const placaTitle = document.getElementById('placaTitle');
const placaSub = document.getElementById('placaSub');
const placaPhonePreview = document.getElementById('placaPhonePreview');
const resetBtn = document.getElementById('resetBtn');
const printBtn = document.getElementById('printBtn');
const visitorField = document.getElementById('visitorCount');

// Cores pré-definidas
const colors = {
    "Vende-se": {bg: "#ff0000", text: "#ffffff"},
    "Aluga-se": {bg: "#0000ff", text: "#ffffff"}
};

// Atualiza título e cores
placaType.addEventListener('change', () => {
    placaTitle.textContent = placaType.value;
    const color = colors[placaType.value];
    placaPreview.style.backgroundColor = color.bg;
    placaTitle.style.color = color.text;
    placaSub.style.color = color.text;
    placaPhonePreview.style.color = color.text;
});

// Atualiza texto adicional
placaText.addEventListener('input', () => {
    placaSub.textContent = placaText.value || "Sua placa aqui";
});

// Formata telefone
placaPhone.addEventListener('input', () => {
    let value = placaPhone.value.replace(/\D/g, '');
    if(value.length > 11) value = value.slice(0,11);
    let formatted = value;
    if(value.length > 10) formatted = `(${value.slice(0,2)}) ${value.slice(2,3)} ${value.slice(3,7)}-${value.slice(7)}`;
    else if(value.length > 6) formatted = `(${value.slice(0,2)}) ${value.slice(2,6)}-${value.slice(6)}`;
    else if(value.length > 2) formatted = `(${value.slice(0,2)}) ${value.slice(2)}`;
    else if(value.length > 0) formatted = `(${value}`;
    placaPhonePreview.textContent = formatted || "(  ) 9 XXXX-XXXX";
});

// Resetar placa
resetBtn.addEventListener('click', () => {
    placaType.value = 'Vende-se';
    placaText.value = '';
    placaPhone.value = '';
    const color = colors['Vende-se'];
    placaTitle.textContent = 'Vende-se';
    placaSub.textContent = 'Sua placa aqui';
    placaPhonePreview.textContent = '(  ) 9 XXXX-XXXX';
    placaPreview.style.backgroundColor = color.bg;
    placaTitle.style.color = color.text;
    placaSub.style.color = color.text;
    placaPhonePreview.style.color = color.text;
});

// Imprimir A4 paisagem
printBtn.addEventListener('click', () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Imprimir Placa</title>');
    printWindow.document.write('<style>@page { size: A4 landscape; margin: 20mm; } body { margin:0; padding:0; }</style>');
    printWindow.document.write('</head><body>');
    const color = colors[placaType.value];
    printWindow.document.write('<div style="width:100%; height:100%; display:flex; justify-content:center; align-items:center; font-family:Arial; padding:50px; border:4px solid #000; border-radius:10px; background-color:' + color.bg + '; color:' + color.text + ';">');
    printWindow.document.write('<div style="text-align:center;">');
    printWindow.document.write('<div style="font-size:48px; font-weight:bold; letter-spacing:2px; text-transform:uppercase;">' + placaTitle.textContent + '</div>');
    printWindow.document.write('<div style="font-size:36px; margin-top:15px;">' + placaSub.textContent + '</div>');
    printWindow.document.write('<div style="font-size:28px; margin-top:25px; font-weight:bold;">' + placaPhonePreview.textContent + '</div>');
    printWindow.document.write('</div></div>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
});

// Contador de visitantes usando CountAPI
const COUNT_KEY = 'editor-de-placas'; // chave única para o contador

fetch(`https://api.countapi.xyz/hit/${COUNT_KEY}/visits`)
  .then(res => res.json())
  .then(data => {
      visitorField.textContent = `${data.value} visitantes`;
  })
  .catch(err => {
      visitorField.textContent = `Não foi possível carregar visitantes`;
      console.error(err);
  });
