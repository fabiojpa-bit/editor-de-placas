function atualizarPlaca() {
  const modelo = document.getElementById("modelo").value;
  const telefone = document.getElementById("telefone").value;
  const corFundo = document.getElementById("corFundo").value;
  const corTexto = document.getElementById("corTexto").value;

  const placa = document.getElementById("placa");
  const titulo = document.getElementById("placa-titulo");
  const texto = document.getElementById("placa-texto");

  titulo.textContent = modelo === "vende" ? "VENDE-SE" : "ALUGA-SE";
  texto.textContent = telefone || "(  ) 9 XXXX-XXXX";

  placa.style.backgroundColor = corFundo;
  placa.style.color = corTexto;
}

function mostrarPagamento() {
  document.getElementById("pagamento").classList.remove("hidden");
}

function liberarPDF() {
  document.getElementById("pagamento").classList.add("hidden");
  document.getElementById("download").classList.remove("hidden");
}

function gerarPDF() {
  const placa = document.getElementById("placa");

  html2canvas(placa).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4"
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, 'PNG', 10, 10, pageWidth - 20, pageHeight - 20);

    pdf.save('placa.pdf');
  });
}
