// Aplica cores de fundo e texto
function aplicarEstilo() {
  const corFundo = document.getElementById("corFundo").value;
  const corTexto = document.getElementById("corTexto").value;
  const placa = document.getElementById("placa");
  placa.style.backgroundColor = corFundo;
  placa.style.color = corTexto;
}

// Mostra o pagamento PIX
function mostrarPagamento() {
  document.getElementById("pagamento").classList.remove("hidden");
}

// Libera o botão de download após pagamento
function liberarPDF() {
  document.getElementById("pagamento").classList.add("hidden");
  document.getElementById("download").classList.remove("hidden");
}

// Gera o PDF da placa
function gerarPDF() {
  const placa = document.getElementById("placa");
  html2canvas(placa).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, 'PNG', 10, 10, pageWidth - 20, pageHeight - 20);
    pdf.save('placa.pdf');
  });
}
