# Primer: the UAE used OEM car parts trade

Written 2026-10-19 for MotoArk. A short brief so Jamie can follow the trade's words and incentives
in a first call. The sources are thin and partly old (noted inline); treat the figures as
orientation, not fact.

## The trade

- **OEM / genuine vs. aftermarket:** OEM (original equipment manufacturer) parts carry the car
  maker's part number (the "OE number"). Aftermarket parts are third-party copies. "Genuine used"
  means OEM parts taken from a donor car.
- **Donor car:** a written-off or end-of-life vehicle that a yard strips for parts. Its VIN ties
  each part to a known spec, which is what makes a fitment check possible.
- **Yards / dismantlers / breakers:** the sellers. In the UAE they cluster in Sharjah's industrial
  areas (Industrial Area 7 along Al Khan Road, plus Al Sajaa, Al Taif and Hamriyah Free Zone) and
  in Dubai's Al Quoz and Ras Al Khor. Stock comes largely from accident vehicles, insurer
  write-offs, police auctions, and cars imported from Japan and Germany (Gulf News, undated).
- **Re-export:** Sharjah has long been a regional hub that re-exports parts and engines to the
  GCC, Africa and Asia (Khaleej Times, 2006: over $2bn a year in 2005). This is why MotoArk names
  Gulf and North African expansion.
- **Buyers:** independent workshops and garages (MotoArk counts 9,577 in the UAE). Customers come
  to them because dealer parts and labour are expensive; a used genuine part is often half the
  price of a new one or less.
- **Brokers / runners:** middlemen who phone around yards and WhatsApp groups to find a part,
  then add their margin. A runner physically collects it. This chain is the cost and delay
  MotoArk wants to remove.
- **Fitment:** whether a part fits a given car. Within one model, parts differ by year, engine,
  trim and market (GCC spec vs. Japanese or US import), so a VIN lookup against the maker's
  catalogue is the check. Partslink24 is the official multi-brand OEM catalogue portal; Vincario
  is a VIN decoding API.
- **Warranty and returns:** usually informal or absent in this trade, so trust between garages
  and yards carries the risk. A listed warranty and returns policy is a real differentiator.

## Money and rules

- **VAT:** the UAE charges 5% VAT, and B2B sales need a tax invoice. That is why MotoArk issues
  the invoice only after the seller accepts the order.
- **Trade licence and Emirates ID:** standard KYC (know-your-customer checks) for onboarding a
  UAE business seller.
- **BNPL:** Tabby and Tamara are the two Gulf buy-now-pay-later providers; N-Genius (Network
  International) is the main local card acquirer.
- **Data residency:** Azure UAE North (Dubai) keeps data in-country, which UAE enterprises and
  regulators increasingly expect.

## Where the market is going

- Online parts selling in the UAE is mostly new or aftermarket stock (PartSouq, EXIST.AE and
  others). Bringing yard inventory online is earlier-stage. BuyAnyAutoPart, a UAE B2B used-parts
  platform for garages, raised a $750K pre-seed in December 2024 (Vehicle Service Pros).
- The hard part is supply-side digitisation: getting part-level, photographed, catalogue-matched
  stock out of yards that run on memory and notebooks. Every player that wins here does field
  operations, not just software.

## Sources

- [Gulf News: used car parts industry thrives on accidents](https://gulfnews.com/uae/used-car-parts-industry-thrives-on-accidents-1.234113)
- [Khaleej Times: regional boom drives up Sharjah auto parts trade](https://www.khaleejtimes.com/business/regional-boom-drives-up-sharjah-auto-parts-trade)
- [Vehicle Service Pros: BuyAnyAutoPart secures $750K pre-seed](https://www.vehicleservicepros.com/aftermarket-business-world/news/article/55249517/buyanyautopart-secures-750k-in-pre-seed-funding)
- [Mercur architecture (Medusa v2 marketplace)](https://docs.mercurjs.com/learn/architecture)
