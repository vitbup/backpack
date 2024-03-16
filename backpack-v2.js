// Chế độ giao dịch
// 0: Farm cho đến khi hết tiền
// 1: Dừng lại khi số dư còn lại bao nhiêu đó
// 2: Dừng lại sau khi farm được số lần nhất định
const tradeType = 0;

// Khi số dư usdc còn lại dưới giá trị này, script sẽ mua lần cuối cùng và dừng lại
const stopUsdc = 0;
// Thiết lập số lần giao dịch bao gồm mua hoặc bán
const stopTradeAmout = 100;

let timer;
let counter = 1;
const trade = async () => {

   let isLastest = false;
   if (tradeType === 1) {
      const balanceArray = document.getElementsByClassName('_ls-167744059')[5].textContent.split(' ');
      const balance = balanceArray[0];
      if (parseFloat(balance) < stopUsdc) {
         console.log(`Số dư còn lại đã thấp hơn ${stopUsdc} usdc, đã dừng lại`)
         isLastest = true;
      }
   } else if (tradeType === 2) {
      if (counter === stopTradeAmout) {
         console.log(`Số lần thực hiện chương trình đã đạt ${stopTradeAmout}, đã dừng lại`)
         isLastest = true;
      }
   }

   document.getElementsByClassName('bg-baseBackgroundL1')[3].click();
   await new Promise(resolve => setTimeout(resolve, 100));
   document.getElementsByClassName('bg-greenPrimaryButtonBackground')[0].click()
   await new Promise(resolve => setTimeout(resolve, 1000));

   if (isLastest) {
      console.log('Sẵn sàng dừng lại');
      clearInterval(timer);
      return;
   }

   document.getElementsByClassName('border-b-baseBorderMed')[0].click()
   await new Promise(resolve => setTimeout(resolve, 100));
   document.getElementsByClassName('bg-baseBackgroundL1')[3].click();
   await new Promise(resolve => setTimeout(resolve, 100));
   document.getElementsByClassName('bg-redPrimaryButtonBackground')[0].click()
   await new Promise(resolve => setTimeout(resolve, 1000));
   document.getElementsByClassName('border-b-baseBorderMed')[0].click()
   counter++;
}

timer = setInterval(trade, 8000)
