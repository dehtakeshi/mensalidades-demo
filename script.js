const grades = [
  { title: "1º Ano - Ensino Médio", period: "Manhã", discount: "30%", year: "2026", value: "300,00" },
  { title: "2º Ano - Ensino Médio", period: "Manhã", discount: "30%", year: "2026", value: "300,00" },
  { title: "3º Ano - Ensino Médio", period: "Manhã", discount: "30%", year: "2026", value: "300,00" },
];

const cards = document.querySelector("#cards");
const filterToggle = document.querySelector("#filterToggle");
const filterPanel = document.querySelector("#filterPanel");
const confirmButton = document.querySelector("#confirm");
const updateAllButton = document.querySelector("#updateAll");
const successModal = document.querySelector("#successModal");

function buildCard(grade) {
  const article = document.createElement("article");
  article.className = "grade-card";
  article.innerHTML = `
    <div class="grade-info">
      <h2 class="grade-title">${grade.title}</h2>
      <div class="badges" aria-label="Características da turma">
        <span class="badge">${grade.period}</span>
        <span class="badge">${grade.discount}</span>
        <span class="badge">${grade.year}</span>
      </div>
    </div>
    <div class="price-block">
      <div class="price-label">
        Mensalidades
        <span class="info-dot" title="Valor integral da mensalidade">i</span>
      </div>
      <div class="price-field" aria-label="Valor da mensalidade">
        <label class="price-input-label">
          <span class="currency">R$</span>
          <input class="amount-input" inputmode="decimal" aria-label="Valor da mensalidade de ${grade.title}" value="${grade.value}" />
        </label>
        <button class="edit-icon" type="button" aria-label="Editar mensalidade de ${grade.title}"></button>
      </div>
    </div>
    <button class="secondary-button" type="button">Atualizar</button>
  `;

  const updateButton = article.querySelector(".secondary-button");
  const editButton = article.querySelector(".edit-icon");
  const amountInput = article.querySelector(".amount-input");

  editButton.addEventListener("click", () => {
    amountInput.focus();
    amountInput.select();
  });

  amountInput.addEventListener("input", () => {
    amountInput.value = amountInput.value.replace(/[^\d,.]/g, "");
  });

  amountInput.addEventListener("blur", () => {
    const rawValue = amountInput.value.trim();
    if (!rawValue) {
      amountInput.value = grade.value;
      return;
    }

    const normalized = rawValue.replace(/\./g, "").replace(",", ".");
    const parsed = Number(normalized);
    if (Number.isNaN(parsed)) {
      amountInput.value = grade.value;
      return;
    }

    amountInput.value = parsed.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  });

  updateButton.addEventListener("click", () => {
    updateButton.textContent = "Atualizado";
    updateButton.style.borderColor = "var(--success)";
    updateButton.style.color = "var(--success)";
  });

  return article;
}

grades.forEach((grade) => cards.appendChild(buildCard(grade)));

filterToggle.addEventListener("click", () => {
  const isOpen = filterPanel.classList.toggle("is-open");
  filterToggle.setAttribute("aria-expanded", String(isOpen));
});

updateAllButton.addEventListener("click", () => {
  document.querySelectorAll(".secondary-button").forEach((button) => {
    button.textContent = "Atualizado";
    button.style.borderColor = "var(--success)";
    button.style.color = "var(--success)";
  });
});

confirmButton.addEventListener("click", () => {
  if (typeof successModal.showModal === "function") {
    successModal.showModal();
    return;
  }

  successModal.setAttribute("open", "");
});
