<template>
  <div id="incorporation-agreement">
    <!-- Intro section -->
    <section class="mt-10">
      <header>
        <h2>1. Incorporation Agreement and Articles</h2>
      </header>

      <!-- Benefit Company header-->
      <div class="pt-2 pb-3">
        <span>Before submitting your incorporation application you <b>must complete, sign, and date</b> an</span>
        <v-tooltip top max-width="20rem" content-class="top-tooltip" transition="fade-transition">
          <template v-slot:activator="{ on }">
            <span v-on="on" class="tool-tip"> Incorporation Agreement</span>
          </template>
          <span>
            A document that is signed and dated by the people who agree to form the corporation. They are the
            incorporators and the first shareholders of the corporation.
          </span>
        </v-tooltip>
        <span>, and a set of </span>
        <v-tooltip top max-width="20rem" content-class="top-tooltip" transition="fade-transition">
          <template v-slot:activator="{ on }">
            <span v-on="on" class="tool-tip" v-html="getIncorporationArticlesResource.articles"></span>
          </template>
          <span v-html="getIncorporationArticlesResource.articlesTooltip"></span>
        </v-tooltip>
        <template v-if="isTypeBcomp || isTypeBcUlcCompany || isTypeBcCcc">
          containing a
          <v-tooltip top max-width="20rem" content-class="top-tooltip" transition="fade-transition">
            <template v-slot:activator="{ on }">
              <span v-on="on" class="tool-tip" v-html="getIncorporationArticlesResource.provisions"></span>
            </template>
            <span v-html="getIncorporationArticlesResource.provisionTooltip"></span>
          </v-tooltip>
          for the company you are about to incorporate.
        </template>
      </div>

      <!-- Help Section -->
      <span class="help-btn" @click="helpToggle = !helpToggle">
        <v-icon color="primary" style="padding-right: 5px">mdi-help-circle-outline</v-icon>
        <span v-if="!helpToggle">Help with Incorporation Agreement and Articles</span>
        <span v-else>Hide Help</span>
      </span>

      <v-expand-transition>
        <section v-show="helpToggle" class="incorporation-agreement-help">
          <div
            v-for="(item, index) in getIncorporationAgreementResource.helpSection"
            :id="`agreement-help-${index}`"
            class="help-div"
            :key="index"
          >
            <h3>
              <v-icon v-if="item.icon" :color="item.iconColor" class="article-stmt-icon">{{item.icon}}</v-icon>
              {{item.header}}
            </h3>
            <ul v-for="(text, index) in item.helpText"
                :id="`agreement-help-text-${index}`"
                class="help-div"
                :key="index">
              <li>{{text}}</li>
            </ul>
            <ul v-for="(text, index) in item.statements"
                :id="`agreement-statements-${index}`"
                class="articles-statements"
                :key="index">
              <li>{{text}}</li>
            </ul>
          </div>

          <template v-if="isTypeBcomp">
            <div class="help-div">
              <div class="articles-statements-footer">
                In this case, you need to create a unique Incorporation Agreement and set of
                Articles for the company and outline these special rights or restrictions in the
                Articles. We recommend seeking professional assistance from a lawyer or accountant
                to help you prepare your Incorporation Agreement and Articles.
              </div>
            </div>
          </template>

          <div class="help-div" v-if="isTypeBcomp">
            <h3>Retain the signed Incorporation Agreement and {{ entityDescription }} Articles</h3>
            <ul>
              <li>
                The company is required to keep signed copies of the Incorporation Agreement and
                Articles in the company's record book. For a complete list of records, a company
                is required to keep please see <a :href="section42Url" target="_blank">section 42</a>
                of the Business Corporations Act.
              </li>
            </ul>
          </div>
          <div v-else class="help-div">
            <h3>Retain the signed Incorporation Agreement and Company Articles</h3>
            <ul>
              <li>
                The company is required to keep signed copies of the Incorporation Agreement and
                Articles in the company's record book. For a complete list of records, a company
                is required to keep please see <a :href="section42Url" target="_blank">section 42</a>
                of the Business Corporations Act.
              </li>
            </ul>
          </div>

          <u class="help-btn" @click="helpToggle = !helpToggle"><small>Hide Help</small></u>
        </section>
      </v-expand-transition>
    </section>

    <!-- Sample Templates -->
    <template>
      <section class="mt-10">
        <header>
          <h2>2. Sample Templates</h2>
        </header>

        <p>
          For your convenience, we have provided a sample Incorporation Agreement and a set of sample
          {{ entityDescription }} Articles.
        </p>
        <v-card flat class="share-structure-check-panel py-8 px-6">
          <div class="share-structure-check-header">
            <v-icon color="black">mdi-information-outline</v-icon>
            <span> Share Structure Check:</span>
          </div>

          <div class="share-structure-check-text">
            The sample articles CAN ONLY be used if the company's share structure DOES NOT contain a class or series
            with special rights or restrictions.
            <span class="read-more-btn" @click="readMoreFlag = true">
              <span v-if="!readMoreFlag">Read more...</span>
            </span>
            <div v-if="readMoreFlag">
              <div class="read-more-line">
                If the corporation's share structure contains a class or series with special rights or restrictions,
                you need to create a unique set of Articles for the company and outline these special rights or
                restrictions in the Articles.
              </div>
              <div class="read-more-line">
                We recommend seeking professional assistance from a lawyer or accountant to help you prepare your
                Incorporation Agreement and Articles.
                <span class="read-more-btn" @click="readMoreFlag = false">
                <span>Read less...</span>
              </span>
              </div>
            </div>
          </div>

          <div class="d-flex flex-column flex-sm-row justify-center align-center mt-6">
            <img src="@/assets/images/BCRegistries_Sample_IncoporationAgreement_x2.png" class="preview-image" />
            <div class="px-8" />
            <div class="download-link-container py-5">
              <v-icon color="primary" class="mt-n1">mdi-file-pdf-outline</v-icon>
              <a :href="documentURL" download class="ml-1">
                Download the sample Incorporation Agreement and Company Articles
              </a>
            </div>
          </div>
        </v-card>
      </section>

      <section class="mt-10">
        <header id="confirm-agreement">
          <h2>3. Confirm Incorporation Agreement and Article Completion</h2>
        </header>

        <v-card flat class="mt-6">
          <AgreementType :showErrorSummary="!getIncorporationAgreementStep.valid" />
        </v-card>
      </section>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import AgreementType from '@/components/common/AgreementType.vue'
import { IncorporationAgreementIF } from '@/interfaces'
import { RouteNames } from '@/enums'
import { CorpTypeCd } from '@bcrs-shared-components/enums/'
import { CommonMixin } from '@/mixins'
import { GetCorpFullDescription } from '@bcrs-shared-components/corp-type-module'

@Component({
  components: {
    AgreementType
  },
  mixins: [
    CommonMixin
  ]
})
export default class IncorporationAgreement extends Vue {
  @Getter isTypeBcomp!: boolean
  @Getter isTypeBcCcc!: boolean
  @Getter isTypeBcCompany!: boolean
  @Getter isTypeBcUlcCompany!: boolean
  @Getter getEntityType!: CorpTypeCd
  @Getter getIncorporationAgreementStep!: IncorporationAgreementIF
  @Getter getIncorporationAgreementResource!: any
  @Getter getIncorporationArticlesResource!: any
  @Getter getSampleArticle!: string
  @Getter getShowErrors!: boolean

  // Local properties
  protected helpToggle = false
  protected readMoreFlag = false

  readonly section42Url = 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/' +
    '02057_02#section42'

  /** The entity description. */
  get entityDescription (): string {
    return GetCorpFullDescription(this.getEntityType)
  }

  get documentURL (): string {
    return sessionStorage.getItem('BASE_URL') +
    `files/${this.getSampleArticle}`
  }

  @Watch('$route')
  private async scrollToInvalidComponent (): Promise<void> {
    if (this.getShowErrors && this.$route.name === RouteNames.INCORPORATION_AGREEMENT) {
      // scroll to invalid components
      await this.$nextTick()
      await this.validateAndScroll(
        {
          isAgreementValid: this.getIncorporationAgreementStep.valid
        },
        [
          'confirm-agreement'
        ]
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/theme.scss';

ul {
  list-style-type: disc;
}

li {
  padding-top: 0.25rem;
}

.articles-statements{
  margin-left: 1.3rem;
}

.articles-statements-footer {
  margin-left: 1.8rem;
  margin-top: 1.2rem;
}

p{
  padding-top: 0.5rem;
}

a {
  text-decoration: none;
  color: $app-blue;
}

.help-btn {
  cursor: pointer;
  color: $app-blue;
  vertical-align: middle;
}

.read-more-btn {
  cursor: pointer;
  color: $app-blue;
}

.incorporation-agreement-help {
  margin: 2rem 0;
  border-top: 1px dashed $gray6;
  border-bottom: 1px dashed $gray6;
  padding: 1rem 0;

  h2, h4 {
    padding-top: 1rem;
  }

  u {
    display: flex;
    direction: rtl;
  }
}

.article-stmt-icon {
  margin-right: 0.2rem;
}

.template-details {
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
}

.download-link-container {
  border-top: solid 1px $gray3;
  border-bottom: solid 1px $gray3;
}

.share-structure-check-panel {
  vertical-align: middle;
}

.share-structure-check-text {
  font-size: $px-14;
  padding-left: 4px;
}

.share-structure-check-header {
  font-size: $px-14;
  font-weight: bold;
  padding-bottom: 0.5rem;
}

.preview-image {
  width: 200px;
  height: 259px;
}

.tool-tip {
  border-bottom: 1px dashed #999;
  text-decoration: none;
}

.read-more-line {
  padding-top: 0.5rem;
}

.help-div {
  padding-top: 1rem;
}
</style>
