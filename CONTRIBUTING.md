# **DevOps Journey**-ga contributorlik qilish

Loyihamizga hissa qo'shganingiz uchun tashakkur! Muammolar haqida xabar berish, xatolarni tuzatish yoki yangi funksiyalarni taklif qilish bo‘ladimi, biz barchaning hissalarini mamnuniyat bilan qabul qilamiz. To'g'ri hamkorlik qilish uchun quyidagi ko'rsatmalarni ko'rib chiqing.


## Contirbutorlik qilish usullari
* **Xatolar haqida xabar bering(Report Bugs):** Agar biror xato yoki kutilmagan xatti-harakatlarga duch kelsangiz, [github issuesda](https://github.com/ismoilovdevml/devops-journey/issues) issue oching.
* **Xususiyat soʻrovlarini yuborish(Feature Request): **Yangi funksiya haqida ajoyib fikringiz bormi? Muammo issue va uni batafsil tavsiflang.
* **Kodga contributorlik qilish:** Kodga contirbutorlikni qadrlaymiz! Ko'rsatmalarimizga amal qilgan holda repositoriyani fork qiling, o'zgartirishlaringizni kiriting va ull requestni yuboring.
* **Hujjatlar:** Matndagi xatolarini tuzatish, misollar qo'shish yoki tushuntirishlarni yaxshilash orqali hujjatlarimizni yaxshilashga yordam bering.
* **Pull Requestlarni ko'rib chiqish:** Pull Requestlarni ko'rib chiqish qimmatlidir. Mavjud pull requestlarni izohlang, sinab ko'ring va yaxshilanishlarni taklif qiling.


### Yangi qo'llanma yoki maqola qo'shish bo'yicha yo'riqnoma

**1** Github Repositoriyani fork qilib oling va o'zingizni githubingizdan uni `git clone` qilib oling.

----
> Eslatma: Ushbu platforma **Nextra** asosida qurilgan. Nextra 
> qo'llanmasi o'qish orqali ham platforma bilan ishlashni 
> tushinishingiz mumkin
----

**2** Kodni klon qilib olganingizdan keyin uni birorta IDEA-da ochib oling misol uchun Visual Studio Code(VS Code). `yarn` yoki `pnpm` orqali paketlarni o'rnating va loyihani ishga tushiring

```bash
pnpm i
pnpm next dev
```
Loyiha muvafqqiytali ishga tushganidan keyin ishni boshlasak bo'ladi.

----

**3** **Ma'lum bir bo'limlarga mavzular qo'shish**

Quyidagi bo'limlarga(CI/CD, Konteynerlash,Kubernetes(k8s),Database, Web Serverlar) mavzu qo'shish uchun kodda `/pages/guides` jildida ishlaymiz.

![assets](assets/contributing/1.png)

---
![assets](assets/contributing/2.png)

---
Ushbu Bo'limlarning kodda ko'rinishi va manzili `pages/guides`

![assets](assets/contributing/3.png)

------

Bo'limlarning koddagi manzillari

| Saytda Ko'rinishi   | Kodda ko'rinishi          |
| ------------------- | ------------------------- |
| CI-CD               | `pages/guides/ci-cd`      |
| Konteynerlash       | `pages/guides/konteyner`  |
| Kubernetes(k8s)     | `pages/guides/k8s`        |
| Database            | `pages/guides/database`   |
| Web Serverlar       | `pages/guides/web-server` |

Har bir bo'lim ichida uning mavzulari va `_meta.en-US.json` fayl bor.
Misol uchun Database(`pages/guides/database`) bo'limi mavzulari.

![assets](assets/contributing/4.png)

Hamma mavzular `_meta.en-US.json` fayliga kiritiladi yangi mavzu qo'shmoqchi bo'lsangiz ham shu faylga yangiu mavzuni qo'shishingiz kerak.

Misol uchun Kubernetes(k8s)(`pages/guides/k8s`)-ning  `_meta.en-US.json` konfigratsiya fayli.

```json
{
  "k8s-kirish": {
    "title": "Kubernetesga Kirish",
    "icon": "▶️",
    "description": "Kubernetesga ilk qadamlar",
    "href": "/guides/k8s/k8s-kirish"
  },
  "minikube-wordpress": {
    "title": "Kubernetesda Wordpress deploy qilish",
    "icon": "▶️",
    "description": "Minkubedan foydalanib wordpress ko'tarish",
    "href": "/guides/k8s/minikube-wordpress"
  },
  "minikube": {
    "title": "Minkube",
    "icon": "▶️",
    "description": "Minkube o'rnatish va sozlash",
    "href": "/guides/k8s/minikube"
  },
  "minikube-multi-node": {
    "title": "Multi-Node Clusterdan foydalanish",
    "icon": "▶️",
    "description": "Minkubeda Multi-Node Clusterdan foydalanish",
    "href": "/guides/k8s/minikube-multi-node"
  },
  "k8s-architecture": {
    "title": "Kubernetes Arxitekturasi",
    "icon": "▶️",
    "description": "Kubernetes tarkibiy qismi",
    "href": "/guides/k8s/k8s-architecture"
  },
  "k8s-objects": {
    "title": "Kubernetes Obyektlari",
    "icon": "▶️",
    "description": "k8s native obyektlari",
    "href": "/guides/k8s/k8s-objects"
  }
}
```

`_meta.en-US.json` konfiguratsiya faylini tushinish uchun keling **Kubernetesga Kirish** mavzusi konfigratsiyani ko'rib chiqamiz.

![assets](assets/contributing/5.png)

Rasmda ushbu mavzu uchun `k8s-kirish.en-US.mdx` fayli ochilgan siz ham yangi mavzularni shunday ochishingiz kerak.

```json
  "k8s-kirish": {
    "title": "Kubernetesga Kirish",
    "icon": "▶️",
    "description": "Kubernetesga ilk qadamlar",
    "href": "/guides/k8s/k8s-kirish"
  }
```

`k8s-kirish` bu fayl nomi hisoblanaadi va bu yerga fayl nomi to'gri kiritilishi kerak. `"tittle"` esa bu mavzuning sarlavhasi hisoblanadi. `"description"` bu mavzuning qisqachi izohi. `"href"` mavzu joylashgan yo'lni tasvirlaydi.