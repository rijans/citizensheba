# Bilingual Document Title and Meta Description

SERP copy must surface Bengali first while the Mixed UI keeps English-first visible H1s. We generate Document Titles as `বাংলা — English | CitizenSheba` and Meta Descriptions as a Bengali sentence followed by an English sentence, always composed from content fields (`title_bn`/`title`, `name_bn`/`name`, `description_bn`/`description`, plus BN/EN site constants on static pages). We rejected storing separate `meta_title` / `meta_description` overrides and rejected flipping on-page H1 order to match SERP order.
