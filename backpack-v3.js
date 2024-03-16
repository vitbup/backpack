function getElementByXpath(path) {
  return document.evaluate(
    path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}
// Chế độ giao dịch
// 0: Farm cho đến khi hết tiền 
// 1: Dừng lại khi số dư còn lại bao nhiêu đó
// 2: Dừng lại sau khi farm được số lần nhất định

const tradeType = 0;

// Khi số dư usdc còn lại dưới giá trị này, script sẽ mua lần cuối cùng và dừnglại
const stopUsdc = 0; 
// Thiết lập số lần giao dịch bao gồm mua hoặc bán
const stopTradeAmout = 100;

let timer;
let counter = 1;
const trade = async () => {
  console.log(`Đang thực hiện lần thứ ${counter}`);
  let isLastest = false;
  if (tradeType === 1) {
    const balanceArray = document
      .getElementsByClassName("_ls-167744059")[5]
      .textContent.split(" ");
    const balance = balanceArray[0];
    if (parseFloat(balance) < stopUsdc) {
      console.log(`Số dư còn lại đã thấp hơn ${stopUsdc} usdc, đã dừng lại`);
      isLastest = true;
    }
  } else if (tradeType === 2) {
    if (counter === stopTradeAmout) {
      console.log(
        `Số lần thực hiện chương trình đã đạt ${stopTradeAmout}, đã dừnglại`
      );
      isLastest = true;
    }
  }
  console.log("Đang thực hiện mua");
  getElementByXpath(
    '//*[@id="__next"]/div[2]/div[3]/div/div[2]/div[3]/div/div[1]/div[1]'
  ).click();
  await new Promise((resolve) => setTimeout(resolve, 100));
  getElementByXpath(
    '//*[@id="__next"]/div[2]/div[3]/div/div[2]/div[3]/div/div[2]/div[2]/div/div[3]/div[3]/div[4]'
  ).click();
  await new Promise((resolve) => setTimeout(resolve, 100));
  getElementByXpath(
    '//*[@id="__next"]/div[2]/div[3]/div/div[2]/div[3]/div/div[2]/div[2]/div/button'
  ).click();
  await new Promise((resolve) => setTimeout(resolve, 100));
  console.log("Đã mua thành công");

  console.log("Đang thực hiện bán");
  getElementByXpath(
    '//*[@id="__next"]/div[2]/div[3]/div/div[2]/div[3]/div/div[1]/div[2]'
  ).click();
  await new Promise((resolve) => setTimeout(resolve, 100));
  getElementByXpath(
    '//*[@id="__next"]/div[2]/div[3]/div/div[2]/div[3]/div/div[2]/div[2]/div/div[3]/div[3]/div[4]'
  ).click();
  await new Promise((resolve) => setTimeout(resolve, 100));
  getElementByXpath(
    '//*[@id="__next"]/div[2]/div[3]/div/div[2]/div[3]/div/div[2]/div[2]/div/button'
  ).click();
  await new Promise((resolve) => setTimeout(resolve, 100));
  console.log("Đã bán thành công");

  if (isLastest) {
    console.log("Sẵn sàng dừng lại");
    clearInterval(timer);
    return;
  }
  counter++;
};
timer = setInterval(trade, 8000);
